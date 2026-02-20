import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { RigidBody, RapierRigidBody } from '@react-three/rapier'
import * as THREE from 'three'
// Vite가 번들 시 실제 URL로 변환해줌 → dev/prod 모두 안정적으로 동작
import coinDropUrl from '../assets/coin-drop.mp3'

interface CoinProps {
    position: [number, number, number]
    /** 코인 타입: 금화(gold) 또는 은화(silver) */
    type?: 'silver' | 'gold'
    /** 코인 고유 이름 (낙하 로그에 표시됨) */
    name?: string
    /** 낙하 시 타입과 이름을 전달하는 콜백 */
    onFall?: (type: 'silver' | 'gold', name: string) => void
    /** 반지름 (Leva 슬라이더로 외부에서 주입, 없으면 기본값 사용) */
    radius?: number
    /** ShuffleBox가 임펜스를 가하기 위한 RigidBody ref 콜백 */
    rigidBodyRef?: (body: RapierRigidBody | null) => void
}

// 기본 반지름 (Leva 슬라이더가 없을 때 폴백값)
const DEFAULT_GOLD_RADIUS = 1.3
const DEFAULT_SILVER_RADIUS = 1.0

// ── Web AudioContext 기반 사운드 시스템 ──────────────────────────────────
let audioCtx: AudioContext | null = null
let audioBuffer: AudioBuffer | null = null

async function initAudio() {
    if (audioCtx) {
        if (audioCtx.state === 'suspended') await audioCtx.resume()
        return
    }
    try {
        audioCtx = new AudioContext()
        const res = await fetch(coinDropUrl)
        const arrayBuf = await res.arrayBuffer()
        audioBuffer = await audioCtx.decodeAudioData(arrayBuf)
        console.log('[CoinDrop] 오디오 로드 완료 ✅')
    } catch (e) {
        console.warn('[CoinDrop] 오디오 로드 실패:', e)
    }
}

document.addEventListener('click', () => initAudio(), { once: true })
document.addEventListener('keydown', () => initAudio(), { once: true })

function playCoinDrop(type: 'silver' | 'gold') {
    if (!audioCtx || !audioBuffer) return
    try {
        if (audioCtx.state === 'suspended') audioCtx.resume()
        const src = audioCtx.createBufferSource()
        const gain = audioCtx.createGain()
        src.buffer = audioBuffer
        gain.gain.value = type === 'gold' ? 0.85 : 0.5 + Math.random() * 0.2
        src.connect(gain)
        gain.connect(audioCtx.destination)
        src.start(0)
    } catch (_) { /* 예외 무시 */ }
}

// ── Canvas 텍스처로 별 이모지 렌더링 ──────────────────────────────────
// <Text> 컴포넌트(troika)는 이모지를 기본 폰트로 렌더링 불가.
// Canvas 2D API는 OS 이모지 폰트를 직접 사용하므로 항상 올바르게 그려짐.
function createStarTexture(): THREE.CanvasTexture {
    const size = 512
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!

    // 배경 투명
    ctx.clearRect(0, 0, size, size)

    // 별 이모지를 캔버스 중앙에 크게 그림
    ctx.font = `${Math.floor(size * 0.68)}px serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('⭐', size / 2, size / 2 + size * 0.04)

    const tex = new THREE.CanvasTexture(canvas)
    tex.needsUpdate = true
    return tex
}

export default function Coin({ position, type = 'silver', name = '이름없음', onFall, radius, rigidBodyRef }: CoinProps) {
    const coinRadius = radius ?? (type === 'gold' ? DEFAULT_GOLD_RADIUS : DEFAULT_SILVER_RADIUS)
    const bodyRef = useRef<RapierRigidBody>(null)
    const hasLanded = useRef(false)
    const hasFallen = useRef(false)

    // 코인 몸통: 어두우면서도 조명에 반응하는 채도 있는 색
    const faceColor = type === 'gold' ? '#3A2800' : '#151528'
    // 네온 테두리 색: 금화=황금 오렌지, 은화=청백색
    const neonColor = type === 'gold' ? '#FF9900' : '#44CCFF'
    const neonEmissive = type === 'gold' ? '#FF6600' : '#0099FF'

    // 별 이모지 캔버스 텍스처 (컴포넌트당 1회 생성, 메모이제이션)
    const starTexture = useMemo(() => createStarTexture(), [])

    useFrame(() => {
        if (!bodyRef.current || hasFallen.current) return
        const pos = bodyRef.current.translation()
        if (pos.y < -1) {
            hasFallen.current = true
            console.log(`[CoinDrop] ${name} 낙하! y=${pos.y.toFixed(2)}`)
            playCoinDrop(type)
            onFall?.(type, name)
        }
    })

    return (
        <RigidBody
            ref={(body) => {
                // 내부 bodyRef와 외부 rigidBodyRef 동시에 연결
                ; (bodyRef as React.MutableRefObject<RapierRigidBody | null>).current = body
                rigidBodyRef?.(body)
            }}
            position={position}
            colliders="hull"
            friction={0.15}
            restitution={0.2}
            angularDamping={0.4}
            linearDamping={0.4}
            onCollisionEnter={({ other }) => {
                const targetName = other.rigidBodyObject?.name
                if (!hasLanded.current && !hasFallen.current && (targetName === 'floor' || targetName === 'pusher')) {
                    hasLanded.current = true
                    playCoinDrop(type)
                }
            }}
        >
            <group rotation={[Math.PI / 2, 0, 0]}>
                {/* ── 코인 몸통 (어두운 베이스) ── */}
                <mesh castShadow receiveShadow>
                    <cylinderGeometry args={[coinRadius, coinRadius, 0.4, 48]} />
                    <meshStandardMaterial
                        color={faceColor}
                        metalness={0.6}
                        roughness={0.4}
                    />
                </mesh>

                {/* ── 앞면(+Y): 네온 글로우 테두리 링 ── */}
                <mesh position={[0, 0.21, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[coinRadius * 0.78, coinRadius * 0.98, 64]} />
                    <meshStandardMaterial
                        color={neonColor}
                        emissive={neonEmissive}
                        emissiveIntensity={1.8}
                        metalness={0.0}
                        roughness={0.1}
                    />
                </mesh>

                {/* ── 앞면(+Y): 별 아이콘 텍스처 ── */}
                <mesh position={[0, 0.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[coinRadius * 1.3, coinRadius * 1.3]} />
                    <meshBasicMaterial
                        map={starTexture}
                        transparent
                        depthWrite={false}
                        side={THREE.DoubleSide}
                    />
                </mesh>

                {/* ── 뒷면(-Y): 네온 글로우 테두리 링 ── */}
                <mesh position={[0, -0.21, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[coinRadius * 0.78, coinRadius * 0.98, 64]} />
                    <meshStandardMaterial
                        color={neonColor}
                        emissive={neonEmissive}
                        emissiveIntensity={1.8}
                        metalness={0.0}
                        roughness={0.1}
                    />
                </mesh>

                {/* ── 뒷면(-Y): 별 아이콘 텍스처 ── */}
                <mesh position={[0, -0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[coinRadius * 1.3, coinRadius * 1.3]} />
                    <meshBasicMaterial
                        map={starTexture}
                        transparent
                        depthWrite={false}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            </group>

            {/* 코인 소유자 이름 레이블 - 코인 위에 항상 노출 */}
            <Text
                position={[0, coinRadius + 1.2, 0]}
                fontSize={0.9}
                color={type === 'gold' ? '#FFD700' : '#FFFFFF'}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.08}
                outlineColor="#000000"
                renderOrder={1}
            >
                {name}
            </Text>
        </RigidBody>
    )
}
