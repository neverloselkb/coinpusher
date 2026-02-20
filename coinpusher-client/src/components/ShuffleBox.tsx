import { useRef, useImperativeHandle, forwardRef } from 'react'
import { RigidBody, RapierRigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import Coin from './Coin'
import { useControls } from 'leva'

// ── 셔플 박스 외부에서 호출할 수 있는 메서드 ──────────────────────
export interface ShuffleBoxHandle {
    /** 박스 안 코인에 랜덤 임펄스를 가해 섞기 */
    shake: () => void
}

interface CoinData {
    id: number
    name: string
    type: 'silver' | 'gold'
    position: [number, number, number]
}

interface ShuffleBoxProps {
    /** 박스에 채울 코인 목록 (빈 배열이면 박스만 표시) */
    coins: CoinData[]
    /** true이면 바닥을 제거해 코인이 낙하 */
    isOpen: boolean
    /** 낙하한 코인이 게임판 밖으로 나갔을 때 콜백 */
    onCoinFall?: (type: 'silver' | 'gold', name: string) => void
}

// ── 박스 위치/크기 상수 ───────────────────────────────────────────
const BOX_X = 0
const BOX_Y = 16      // 박스 높이 — 낮출수록 낙하 속도 줄어 튕김 감소
const BOX_Z = -4
const BOX_W = 18      // 너비
const BOX_H = 12      // 높이
const BOX_D = 14      // 깊이
const WALL = 0.4     // 벽 두께

// 반투명 유리 머티리얼 팩토리 (네온 색상별로 재사용)
function glassMat(color: string, emissive: string) {
    return (
        <meshStandardMaterial
            color={color}
            emissive={emissive}
            emissiveIntensity={1.2}
            transparent
            opacity={0.18}
            side={THREE.DoubleSide}
            metalness={0.1}
            roughness={0.0}
        />
    )
}
// 네온 라인 머티리얼
function neonMat(color: string) {
    return (
        <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={4}
        />
    )
}

const ShuffleBox = forwardRef<ShuffleBoxHandle, ShuffleBoxProps>(
    ({ coins, isOpen, onCoinFall }, ref) => {

        // 각 코인 RigidBody ref 저장 → shake() 에서 임펄스 적용
        const coinRefs = useRef<Map<number, RapierRigidBody>>(new Map())

        const { goldRadius, silverRadius } = useControls('Coin Size', {
            goldRadius: { value: 1.3, min: 0.3, max: 4.0, step: 0.1 },
            silverRadius: { value: 1.0, min: 0.3, max: 4.0, step: 0.1 },
        })

        // 외부를 향한 메서드 노출
        useImperativeHandle(ref, () => ({
            shake() {
                coinRefs.current.forEach(body => {
                    if (!body) return
                    // 게임판(y=-1)으로 이미 떨어져 나간 코인(y < 5)은 흔들지 않음
                    // 박스는 y=16에 위치하므로 박스 안 코인만 영향 받음
                    if (body.translation().y < 5) return

                    // 수평으로 뒤섞는 임펄스 (y 는 낮게 유지해 천장에 부딪혀도 탈출 안 되게)
                    body.applyImpulse(
                        {
                            x: (Math.random() - 0.5) * 10,
                            y: 8 + Math.random() * 2,   // 8~10 — 천장에 부딪혀도 탈출 안 되게
                            z: (Math.random() - 0.5) * 10,
                        },
                        true
                    )
                    // 회전 토크 (시각적 역동감)
                    body.applyTorqueImpulse(
                        {
                            x: (Math.random() - 0.5) * 5,
                            y: (Math.random() - 0.5) * 5,
                            z: (Math.random() - 0.5) * 5,
                        },
                        true
                    )
                })
            },
        }))

        const pos: [number, number, number] = [BOX_X, BOX_Y, BOX_Z]

        return (
            <group position={pos}>
                {/* ── 시각적 박스 (유리 패널 4면) ── */}
                {/* 왼쪽 벽 */}
                <mesh position={[-BOX_W / 2, 0, 0]}>
                    <boxGeometry args={[WALL, BOX_H, BOX_D]} />
                    {glassMat('#FF2080', '#FF0060')}
                </mesh>
                {/* 오른쪽 벽 */}
                <mesh position={[BOX_W / 2, 0, 0]}>
                    <boxGeometry args={[WALL, BOX_H, BOX_D]} />
                    {glassMat('#00FFEE', '#00DDCC')}
                </mesh>
                {/* 뒤쪽 벽 */}
                <mesh position={[0, 0, -BOX_D / 2]}>
                    <boxGeometry args={[BOX_W, BOX_H, WALL]} />
                    {glassMat('#AA44FF', '#8800FF')}
                </mesh>
                {/* 앞쪽 벽 */}
                <mesh position={[0, 0, BOX_D / 2]}>
                    <boxGeometry args={[BOX_W, BOX_H, WALL]} />
                    {glassMat('#AA44FF', '#8800FF')}
                </mesh>
                {/* 윗면 시각 - 퍼붓기 전까진 반투명 뚜껑으로 막음 */}
                {!isOpen && (
                    <mesh position={[0, BOX_H / 2, 0]}>
                        <boxGeometry args={[BOX_W, WALL, BOX_D]} />
                        <meshStandardMaterial
                            color="#AA44FF"
                            emissive="#8800FF"
                            emissiveIntensity={1}
                            transparent
                            opacity={0.25}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                )}

                {/* ── 네온 테두리 (에지 라인) ── */}
                {/* 상단 테두리 사각형 */}
                {[
                    [0, BOX_H / 2, BOX_D / 2, BOX_W, 0.08, 0.08] as const,
                    [0, BOX_H / 2, -BOX_D / 2, BOX_W, 0.08, 0.08] as const,
                    [-BOX_W / 2, BOX_H / 2, 0, 0.08, 0.08, BOX_D] as const,
                    [BOX_W / 2, BOX_H / 2, 0, 0.08, 0.08, BOX_D] as const,
                    // 하단 테두리
                    [0, -BOX_H / 2, BOX_D / 2, BOX_W, 0.08, 0.08] as const,
                    [0, -BOX_H / 2, -BOX_D / 2, BOX_W, 0.08, 0.08] as const,
                    [-BOX_W / 2, -BOX_H / 2, 0, 0.08, 0.08, BOX_D] as const,
                    [BOX_W / 2, -BOX_H / 2, 0, 0.08, 0.08, BOX_D] as const,
                ].map(([x, y, z, w, h, d], i) => (
                    <mesh key={i} position={[x, y, z]}>
                        <boxGeometry args={[w, h, d]} />
                        {neonMat(i < 4 ? '#AA44FF' : '#FF2080')}
                    </mesh>
                ))}

                {/* ── 물리 충돌 벽 (RigidBody를 각각 분리해야 내부가 비어있음) ── */}
                {/* 왼쪽 */}
                <RigidBody type="fixed" friction={0.4} restitution={0.1} position={[-BOX_W / 2, 0, 0]}>
                    <mesh>
                        <boxGeometry args={[WALL, BOX_H, BOX_D]} />
                        <meshBasicMaterial visible={false} />
                    </mesh>
                </RigidBody>
                {/* 오른쪽 */}
                <RigidBody type="fixed" friction={0.4} restitution={0.1} position={[BOX_W / 2, 0, 0]}>
                    <mesh>
                        <boxGeometry args={[WALL, BOX_H, BOX_D]} />
                        <meshBasicMaterial visible={false} />
                    </mesh>
                </RigidBody>
                {/* 뒤쪽 */}
                <RigidBody type="fixed" friction={0.4} restitution={0.1} position={[0, 0, -BOX_D / 2]}>
                    <mesh>
                        <boxGeometry args={[BOX_W, BOX_H, WALL]} />
                        <meshBasicMaterial visible={false} />
                    </mesh>
                </RigidBody>
                {/* 앞쪽 */}
                <RigidBody type="fixed" friction={0.4} restitution={0.1} position={[0, 0, BOX_D / 2]}>
                    <mesh>
                        <boxGeometry args={[BOX_W, BOX_H, WALL]} />
                        <meshBasicMaterial visible={false} />
                    </mesh>
                </RigidBody>

                {/* ── 천장 물리 충돌 (퍼붓기 전까지 막아 코인 탈출 방지) ── */}
                {!isOpen && (
                    <RigidBody type="fixed" friction={0} restitution={0.1} position={[0, BOX_H / 2, 0]}>
                        <mesh>
                            <boxGeometry args={[BOX_W, WALL, BOX_D]} />
                            <meshBasicMaterial visible={false} />
                        </mesh>
                    </RigidBody>
                )}

                {/* ── 바닥 (isOpen=true 이면 제거 → 코인 낙하) ── */}
                {!isOpen && (
                    <RigidBody type="fixed" friction={0.3} restitution={0.1} position={[0, -BOX_H / 2, 0]}>
                        <mesh>
                            <boxGeometry args={[BOX_W, WALL, BOX_D]} />
                            <meshStandardMaterial
                                color="#AA44FF"
                                emissive="#6600CC"
                                emissiveIntensity={2}
                                transparent
                                opacity={0.6}
                            />
                        </mesh>
                    </RigidBody>
                )}

                {/* ── 코인들 ── */}
                {/* ── 코인들 ── */}
                {/* 항상 onFall을 연결해야 이전 라운드에 떨어져 게임판에 있는 코인들이 언제든 낙하 시 점수로 인정됨 */}
                {coins.map(coin => (
                    <Coin
                        key={coin.id}
                        position={coin.position}
                        type={coin.type}
                        name={coin.name}
                        radius={coin.type === 'gold' ? goldRadius : silverRadius}
                        onFall={onCoinFall}
                        rigidBodyRef={(body) => {
                            if (body) coinRefs.current.set(coin.id, body)
                            else coinRefs.current.delete(coin.id)
                        }}
                    />
                ))}
            </group>
        )
    }
)

ShuffleBox.displayName = 'ShuffleBox'
export default ShuffleBox
export type { CoinData as ShuffleCoinData }
