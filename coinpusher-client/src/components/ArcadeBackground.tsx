import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

// ── 오락실 배경 전용 컴포넌트 ────────────────────────────────────────────────
// 게임 씬 주위에 배치되는 장식 요소들:
// - 코너 네온 기둥 4개 (핑크/시안 교대)
// - 천장 조명 바 (수평 발광 바)
// - 상단 네온 간판
// - 격자 발광 바닥 (게임 바닥 아래)
// - 뒷벽 패널

// 기둥 한 개를 그리는 내부 컴포넌트
function NeonPillar({
    position,
    color,
    emissive,
}: {
    position: [number, number, number]
    color: string
    emissive: string
}) {
    return (
        <group position={position}>
            {/* 기둥 몸통 */}
            <mesh>
                <cylinderGeometry args={[0.3, 0.3, 18, 12]} />
                <meshStandardMaterial
                    color="#111122"
                    metalness={0.9}
                    roughness={0.2}
                />
            </mesh>
            {/* 네온 발광 선 (기둥 표면에 얇은 실린더) */}
            <mesh>
                <cylinderGeometry args={[0.35, 0.35, 18, 12, 1, true]} />
                <meshStandardMaterial
                    color={color}
                    emissive={emissive}
                    emissiveIntensity={1.5}
                    transparent
                    opacity={0.35}
                    side={THREE.BackSide}
                />
            </mesh>
            {/* 기둥 상단 캡 (발광 원형 디스크) */}
            <mesh position={[0, 9.1, 0]}>
                <cylinderGeometry args={[0.5, 0.5, 0.2, 16]} />
                <meshStandardMaterial
                    color={color}
                    emissive={emissive}
                    emissiveIntensity={3}
                />
            </mesh>
        </group>
    )
}

// 천장 조명 바 한 개
function CeilingBar({
    position,
    color,
    emissive,
    length = 20,
}: {
    position: [number, number, number]
    color: string
    emissive: string
    length?: number
}) {
    return (
        <mesh position={position}>
            <boxGeometry args={[length, 0.12, 0.12]} />
            <meshStandardMaterial
                color={color}
                emissive={emissive}
                emissiveIntensity={4}
            />
        </mesh>
    )
}

// 네온 간판 (깜빡임 애니메이션 포함)
function NeonSign() {
    // 깜빡임을 위해 ref로 머티리얼 직접 제어
    const matRef = useRef<THREE.MeshStandardMaterial>(null)
    let t = 0

    useFrame((_, delta) => {
        if (!matRef.current) return
        t += delta
        // 0.8~1.0 사이로 부드럽게 진동 (완전히 꺼지지 않는 네온 효과)
        const flicker = 0.9 + Math.sin(t * 6) * 0.05 + Math.sin(t * 17) * 0.05
        matRef.current.emissiveIntensity = flicker * 2.5
    })

    return (
        <group position={[0, 14, -14.5]}>
            {/* 간판 배경 패널 */}
            <mesh>
                <boxGeometry args={[14, 2.5, 0.2]} />
                <meshStandardMaterial
                    color="#0a0012"
                    metalness={0.5}
                    roughness={0.5}
                />
            </mesh>
            {/* 간판 테두리 (핑크 네온) */}
            <mesh>
                <boxGeometry args={[14.3, 2.8, 0.15]} />
                <meshStandardMaterial
                    ref={matRef}
                    color="#FF2080"
                    emissive="#FF0060"
                    emissiveIntensity={2.5}
                    transparent
                    opacity={0.0}
                    side={THREE.BackSide}
                />
            </mesh>
            {/* 간판 외곽 네온 선 4개 */}
            {[
                { pos: [0, 1.3, 0.15] as [number, number, number], size: [14, 0.12, 0.12] as [number, number, number] },
                { pos: [0, -1.3, 0.15] as [number, number, number], size: [14, 0.12, 0.12] as [number, number, number] },
                { pos: [-7, 0, 0.15] as [number, number, number], size: [0.12, 2.6, 0.12] as [number, number, number] },
                { pos: [7, 0, 0.15] as [number, number, number], size: [0.12, 2.6, 0.12] as [number, number, number] },
            ].map((b, i) => (
                <mesh key={i} position={b.pos}>
                    <boxGeometry args={b.size} />
                    <meshStandardMaterial
                        color="#FF2080"
                        emissive="#FF0060"
                        emissiveIntensity={3}
                    />
                </mesh>
            ))}
            {/* 간판 텍스트 - 외부 폰트 URL 없이 기본 폰트 사용 */}
            <Text
                position={[0, 0, 0.2]}
                fontSize={1.1}
                color="#FFE0FF"
                outlineWidth={0.04}
                outlineColor="#FF0088"
                anchorX="center"
                anchorY="middle"
            >
                COIN PUSHER
            </Text>
            <Text
                position={[0, -0.85, 0.2]}
                fontSize={0.55}
                color="#FFDD00"
                outlineWidth={0.03}
                outlineColor="#FF8800"
                anchorX="center"
                anchorY="middle"
            >
                ⭐ 스타 코인 푸셔 ⭐
            </Text>
        </group>
    )
}

export default function ArcadeBackground() {
    return (
        <group>
            {/* ── 네온 코너 기둥 4개 ─────────────────────────────── */}
            {/* 왼쪽 앞 - 핑크 */}
            <NeonPillar position={[-13, 0, 12]} color="#FF2080" emissive="#FF0060" />
            {/* 오른쪽 앞 - 시안 */}
            <NeonPillar position={[13, 0, 12]} color="#00FFEE" emissive="#00DDCC" />
            {/* 왼쪽 뒤 - 시안 */}
            <NeonPillar position={[-13, 0, -14]} color="#00FFEE" emissive="#00DDCC" />
            {/* 오른쪽 뒤 - 핑크 */}
            <NeonPillar position={[13, 0, -14]} color="#FF2080" emissive="#FF0060" />

            {/* ── 천장 수평 조명 바 ──────────────────────────────── */}
            <CeilingBar position={[0, 17.5, -5]} color="#FF2080" emissive="#FF0060" />
            <CeilingBar position={[0, 17.5, 0]} color="#00FFEE" emissive="#00DDCC" />
            <CeilingBar position={[0, 17.5, 5]} color="#AA44FF" emissive="#8800FF" />
            <CeilingBar position={[0, 17.5, 10]} color="#FF2080" emissive="#FF0060" length={26} />

            {/* ── 천장 세로 브리지 바 (기둥 연결) ── */}
            <CeilingBar position={[-13, 17.5, -1]} color="#FF2080" emissive="#FF0060" length={27} />
            <CeilingBar position={[13, 17.5, -1]} color="#00FFEE" emissive="#00DDCC" length={27} />

            {/* ── 뒷벽 장식 패널 ────────────────────────────────── */}
            <mesh position={[0, 8, -15]}>
                <boxGeometry args={[28, 20, 0.3]} />
                <meshStandardMaterial
                    color="#08001A"
                    metalness={0.3}
                    roughness={0.8}
                />
            </mesh>
            {/* 뒷벽 네온 가로줄 */}
            {[-6, -2, 2, 6].map((y, i) => (
                <mesh key={i} position={[0, y + 8, -14.7]}>
                    <boxGeometry args={[26, 0.08, 0.08]} />
                    <meshStandardMaterial
                        color={i % 2 === 0 ? '#FF2080' : '#00FFEE'}
                        emissive={i % 2 === 0 ? '#FF0060' : '#00DDCC'}
                        emissiveIntensity={1.5}
                    />
                </mesh>
            ))}
            {/* 뒷벽 네온 세로줄 */}
            {[-10, -5, 0, 5, 10].map((x, i) => (
                <mesh key={i} position={[x, 8, -14.7]}>
                    <boxGeometry args={[0.08, 18, 0.08]} />
                    <meshStandardMaterial
                        color={i % 2 === 0 ? '#AA44FF' : '#FFAA00'}
                        emissive={i % 2 === 0 ? '#8800FF' : '#FF8800'}
                        emissiveIntensity={1.2}
                    />
                </mesh>
            ))}

            {/* ── 좌우 측벽 ─────────────────────────────────────── */}
            {/* 왼쪽 벽 */}
            <mesh position={[-14, 8, -1]}>
                <boxGeometry args={[0.3, 20, 28]} />
                <meshStandardMaterial color="#060010" metalness={0.2} roughness={0.9} />
            </mesh>
            {/* 오른쪽 벽 */}
            <mesh position={[14, 8, -1]}>
                <boxGeometry args={[0.3, 20, 28]} />
                <meshStandardMaterial color="#060010" metalness={0.2} roughness={0.9} />
            </mesh>

            {/* ── 격자 발광 바닥 (게임 바닥 아래) ─────────────────── */}
            {/* 가로 격자 선 */}
            {Array.from({ length: 11 }, (_, i) => i * 3 - 15).map((z, i) => (
                <mesh key={`hz${i}`} position={[0, -0.05, z]}>
                    <boxGeometry args={[28, 0.04, 0.04]} />
                    <meshStandardMaterial
                        color="#003355"
                        emissive="#0066AA"
                        emissiveIntensity={0.8}
                    />
                </mesh>
            ))}
            {/* 세로 격자 선 */}
            {Array.from({ length: 11 }, (_, i) => i * 3 - 15).map((x, i) => (
                <mesh key={`vz${i}`} position={[x, -0.05, -1.5]}>
                    <boxGeometry args={[0.04, 0.04, 28]} />
                    <meshStandardMaterial
                        color="#003355"
                        emissive="#0066AA"
                        emissiveIntensity={0.8}
                    />
                </mesh>
            ))}

            {/* ── 네온 간판 ─────────────────────────────────────── */}
            <NeonSign />
        </group>
    )
}
