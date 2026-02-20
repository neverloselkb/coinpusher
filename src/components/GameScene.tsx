import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Suspense, useState, useCallback, useRef } from 'react'
import { Leva } from 'leva'
import { Environment, Stars, OrbitControls } from '@react-three/drei'
import Stage from './Stage'
import Pusher from './Pusher'

import ChatPanel, { ShufflePhase } from './ui/ChatPanel'
import ArcadeBackground from './ArcadeBackground'
import ShuffleBox, { ShuffleBoxHandle, ShuffleCoinData } from './ShuffleBox'
import GoogleAd from './ui/GoogleAd'
import winSoundUrl from '../assets/win.mp3'

export default function GameScene() {
    // 낙하한 코인 로그 (이름, 타입, 시각)
    const [fallLog, setFallLog] = useState<{ name: string; type: 'silver' | 'gold'; time: number }[]>([])
    // 최근 낙하 시각 (폄합 애니메이션용)
    const [lastFallTime, setLastFallTime] = useState(0)

    // ── 셔플 박스 상태 머신 ──
    const [shufflePhase, setShufflePhase] = useState<ShufflePhase>('idle')
    const [shuffleCoins, setShuffleCoins] = useState<ShuffleCoinData[]>([])
    const [boxIsOpen, setBoxIsOpen] = useState(false)
    // ShuffleBox가 노출하는 shake() 메서드에 접근하는 ref
    const shuffleBoxRef = useRef<ShuffleBoxHandle>(null)

    // 코인법 golden 확률 (기본값 5%)
    const GOLD_CHANCE = 5

    // [단계 1] 코인 생성: 박스에 코인 채우기
    const handleCreateCoins = useCallback((names: string[], cpp: number) => {
        const newCoins: ShuffleCoinData[] = []
        names.forEach(name => {
            for (let i = 0; i < cpp; i++) {
                const isGold = Math.random() * 100 < GOLD_CHANCE
                newCoins.push({
                    id: Math.random(),
                    name: cpp > 1 ? `${name} #${i + 1}` : name,
                    type: isGold ? 'gold' : 'silver',
                    // 박스 내부 좌표 (BOX_W=18, BOX_H=12, BOX_D=14 내)
                    position: [
                        (Math.random() - 0.5) * 12,   // x: -6 ~ +6
                        // y: 바닥(-6)과 천장(6) 사이에서 서로 겹치지 않게 분산 (newCoins.length 활용)
                        -4 + (newCoins.length % 6) * 1.2 + Math.random() * 0.5,
                        (Math.random() - 0.5) * 8,    // z: -4 ~ +4
                    ],
                })
            }
        })
        // 기존 씬의 코인 유지하면서 새로 생성된 코인만 추가 (APPEND)
        setShuffleCoins(prev => [...prev, ...newCoins])
        setBoxIsOpen(false)
        setShufflePhase('filling')
        // 코인이 상자 바닥에 안착할 시간 주기 (전쳋 코인 수 바를 기준)
        const settleMs = Math.min(2000 + newCoins.length * 60, 6000)
        setTimeout(() => setShufflePhase('ready'), settleMs)
    }, [])

    // [단계 2] 코인 섭기: 랜덤 임펜스 적용
    const handleShake = useCallback(() => {
        if (shufflePhase !== 'ready') return
        setShufflePhase('shaking')
        shuffleBoxRef.current?.shake()
        // 코인들이 다시 안정될 시간 후 ready로 복귀
        setTimeout(() => setShufflePhase('ready'), 2500)
    }, [shufflePhase])

    // [단계 3] 코인 퍼붓기: 박스 바닥 제거 → 코인 낙하
    const handlePour = useCallback(() => {
        if (shufflePhase !== 'ready') return
        setShufflePhase('pouring')
        setBoxIsOpen(true)  // 바닥 RigidBody 제거 → 코인이 중력으로 낙하

        // ⚠️ 여기서 setShuffleCoins([]) 하면 게임판 위에서 굴러다니는 코인도 씬에서 제거됨!
        // 코인은 지우지 않고 UI 상태만 idle로 복귀 (다음 생성 시 클리어)
        setTimeout(() => {
            setShufflePhase('idle')
            setBoxIsOpen(false)   // 박스 자체는 숨김 (코인은 유지)
        }, 5000)
    }, [shufflePhase])

    // 전체 초기화 (ChatPanel의 '새 게임' 클릭 시 호출됨)
    const handleReset = useCallback(() => {
        setShufflePhase('idle')
        setShuffleCoins([])
        setFallLog([])
        setLastFallTime(0)
        setBoxIsOpen(false)
    }, [])

    const handleCoinFall = useCallback((type: 'silver' | 'gold', name: string) => {
        setFallLog(prev => {
            if (prev.length === 0) {
                const audio = new Audio(winSoundUrl)
                audio.volume = 0.5
                audio.play().catch(e => console.warn('Win sound play failed:', e))
            }
            return [{ name, type, time: Date.now() }, ...prev.slice(0, 49)]
        })
        setLastFallTime(Date.now())
    }, [])

    // 낙하 직후 500ms 동안 폄스 효과
    const isPulsing = Date.now() - lastFallTime < 500

    // 금/은 카운트 요약 (로그에서 집계)
    const goldCount = fallLog.filter(c => c.type === 'gold').length
    const silverCount = fallLog.filter(c => c.type === 'silver').length

    return (
        <>
            {/* Leva UI 패널 - 개발용 컨트롤러 */}
            <Leva collapsed />
            <Canvas
                shadows
                // 정면에 가까운 카메라 - Y를 조금 높이고 Z를 멀리 두어 전체적으로 보이게 함
                camera={{ position: [0, 8, 48], fov: 50 }}
                gl={{ antialias: true }}
            >
                {/* 오락실 분위기: 짙은 보라 배경 */}
                <color attach="background" args={['#05001A']} />

                {/* 배경 별 - 더 조밀하게 */}
                <Stars radius={80} depth={40} count={5000} factor={3} fade speed={0.5} />

                {/* 마우스 드래그로 카메라 회전/줌/패닝 */}
                <OrbitControls
                    enableDamping
                    dampingFactor={0.08}
                    minDistance={10}
                    maxDistance={150}
                />

                {/* 환경광: 스테이지와 코인이 보이도록 충분히 */}
                <ambientLight intensity={0.5} />

                {/* 메인 조명: 위에서 강하게 - 코인/스테이지 가시성 확보 */}
                <directionalLight
                    position={[8, 15, 10]}
                    intensity={2.5}
                    castShadow
                    shadow-mapSize={[2048, 2048]}
                    shadow-camera-far={50}
                    shadow-camera-left={-15}
                    shadow-camera-right={15}
                    shadow-camera-top={15}
                    shadow-camera-bottom={-15}
                    color="#FFFFFF"
                />

                {/* 핑크 네온 왼쪽 조명 */}
                <pointLight
                    position={[-14, 6, 0]}
                    intensity={60}
                    color="#FF2080"
                    distance={30}
                />
                {/* 시안 네온 오른쪽 조명 */}
                <pointLight
                    position={[14, 6, 0]}
                    intensity={60}
                    color="#00FFEE"
                    distance={30}
                />
                {/* 황금빛 코인 위 조명 */}
                <pointLight
                    position={[0, 10, 5]}
                    intensity={40}
                    color="#FFD700"
                    distance={20}
                />
                {/* 보라 뒤쪽 조명 */}
                <pointLight
                    position={[0, 12, -14]}
                    intensity={50}
                    color="#AA44FF"
                    distance={25}
                />

                {/* 환경 반사: studio로 코인 메탈 반사 살리기 */}
                <Environment preset="studio" />

                {/* 오락실 배경 + 게임 물리 오브젝트를 같은 Suspense 안에 배치 */}
                <Suspense fallback={null}>
                    <ArcadeBackground />
                    <Physics gravity={[0, -9.81, 0]}>
                        <Stage />
                        <Pusher />

                        {/* 셔플 박스: 코인 생성/섞기/퍼붓기 컨테이너 */}
                        <ShuffleBox
                            ref={shuffleBoxRef}
                            coins={shuffleCoins}
                            isOpen={boxIsOpen}
                            onCoinFall={handleCoinFall}
                        />
                    </Physics>
                </Suspense>
            </Canvas>

            {/* ===== 좌상단 게임 로고 ===== */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                zIndex: 30,
                pointerEvents: 'none',
                userSelect: 'none',
            }}>
                <h1 style={{
                    margin: 0,
                    fontSize: '28px',
                    fontWeight: 900,
                    color: '#FFF',
                    fontFamily: '"Press Start 2P" , "Orbitron", sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 20px #FF2080, 0 0 40px #FF2080, 0 0 80px #FF2080',
                }}>
                    STAR COIN<br />
                    <span style={{ fontSize: '18px', color: '#00FFEE', textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 20px #00FFEE, 0 0 40px #00FFEE', letterSpacing: '4px' }}>PUSHER</span>
                </h1>
                <div style={{
                    marginTop: '4px',
                    fontSize: '14px',
                    color: '#FFD700',
                    fontWeight: 'bold',
                    textShadow: '0 0 4px #FF8800'
                }}>
                    ⭐ 스타 코인 푸셔 ⭐
                </div>
            </div>

            {/* ===== ChatPanel: 3단계 접수 (idle/ready/shaking/pouring) ===== */}
            <ChatPanel
                phase={shufflePhase}
                onCreateCoins={handleCreateCoins}
                onShake={handleShake}
                onPour={handlePour}
                onReset={handleReset}
            />

            {/* ===== 낙하 코인 로그 패널 ===== */}
            <div style={{
                position: 'absolute',
                bottom: '50px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                pointerEvents: 'none',  // 외부 컨테이너는 클릭 통과
                minWidth: '300px',
            }}>
                {/* 🏆 1등 고정 배너 - 최초로 떨어진 코인 */}
                {fallLog.length > 0 && (() => {
                    const first = fallLog[fallLog.length - 1]  // 가장 오래된 = 1등
                    return (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: 'linear-gradient(90deg, rgba(255,200,0,0.18), rgba(255,100,0,0.12))',
                            border: '1px solid rgba(255,215,0,0.5)',
                            borderRadius: '10px',
                            padding: '7px 16px',
                            width: '100%',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 0 16px rgba(255,215,0,0.2)',
                        }}>
                            <span style={{ fontSize: '18px' }}>🏆</span>
                            <span style={{ fontSize: '11px', color: '#FFD700', fontWeight: 900, letterSpacing: '1px' }}>1등</span>
                            <span style={{ fontSize: '14px' }}>{first.type === 'gold' ? '🥇' : '🥈'}</span>
                            <span style={{
                                fontSize: '14px',
                                fontWeight: 700,
                                color: first.type === 'gold' ? '#FFD700' : '#D0D0D0',
                                flex: 1,
                            }}>
                                {first.name}
                            </span>
                            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>
                                {new Date(first.time).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                            </span>
                        </div>
                    )
                })()}

                {/* 금/은 카운트 요약 바 */}
                <div style={{
                    display: 'flex',
                    gap: '12px',
                    background: 'rgba(0,0,0,0.78)',
                    border: '1px solid rgba(0,255,136,0.35)',
                    borderRadius: '12px',
                    padding: '8px 20px',
                    backdropFilter: 'blur(10px)',
                    transform: isPulsing ? 'scale(1.04)' : 'scale(1)',
                    transition: 'transform 0.15s ease',
                    width: '100%',
                    justifyContent: 'center',
                }}>
                    <span style={{ color: '#FFD700', fontWeight: 700, fontSize: '14px' }}>🥇 금화 {goldCount}개</span>
                    <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
                    <span style={{ color: '#E0E0E0', fontWeight: 700, fontSize: '14px' }}>🥈 은화 {silverCount}개</span>
                </div>

                {/* 낙하 로그 목록 - 스크롤 가능 */}
                {fallLog.length > 0 && (
                    <div style={{
                        background: 'rgba(0,0,0,0.82)',
                        border: '1px solid rgba(0,255,136,0.25)',
                        borderRadius: '10px',
                        padding: '6px 4px',
                        backdropFilter: 'blur(10px)',
                        width: '100%',
                        maxHeight: '180px',
                        overflowY: 'auto',
                        scrollbarWidth: 'thin',
                        scrollbarColor: 'rgba(0,255,136,0.3) transparent',
                        // 이 영역만 마우스 이벤트 허용 → 스크롤 가능
                        pointerEvents: 'auto',
                    }}>
                        {fallLog.map((entry, i) => (
                            <div key={entry.time + i} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '3px 10px',
                                borderRadius: '6px',
                                // 가장 최근(i=0) 항목 강조
                                background: i === 0 ? 'rgba(0,255,136,0.08)' : 'transparent',
                            }}>
                                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)', minWidth: '20px' }}>
                                    #{fallLog.length - i}
                                </span>
                                <span style={{ fontSize: '14px' }}>{entry.type === 'gold' ? '🥇' : '🥈'}</span>
                                <span style={{
                                    fontSize: '13px',
                                    color: entry.type === 'gold' ? '#FFD700' : '#C0C0C0',
                                    fontFamily: 'Inter, sans-serif',
                                    flex: 1,
                                }}>
                                    {entry.name}
                                </span>
                                <span style={{
                                    fontSize: '10px',
                                    color: 'rgba(255,255,255,0.3)',
                                    fontFamily: 'Inter, sans-serif',
                                }}>
                                    {new Date(entry.time).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ===== 구글 애드센스 광고 (우측 하단) ===== */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                zIndex: 10,
            }}>
                <GoogleAd width={250} height={250} placeholderText="우측 하단 광고 영역" />
            </div>

            {/* ===== 구글 애드센스 광고 (우측 상단 세로형) ===== */}
            <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                zIndex: 10,
            }}>
                <GoogleAd width={160} height={600} placeholderText="우측 상단(사이드) 타워 광고" />
            </div>
        </>
    )
}
