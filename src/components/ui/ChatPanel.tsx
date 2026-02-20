import { useState } from 'react'

// 셔플 단계 타입 (GameScene에서도 사용)
export type ShufflePhase = 'idle' | 'filling' | 'ready' | 'shaking' | 'pouring'

interface ChatPanelProps {
    phase: ShufflePhase
    onCreateCoins: (names: string[], coinsPerPerson: number) => void
    onShake: () => void
    onPour: () => void
    onReset: () => void
}

/**
 * 수동 참여자 코인 생성 패널 - 3단계 플로우
 * [1] 코인 생성 → [2] 코인 섞기 → [3] 코인 퍼붓기
 */
export default function ChatPanel({ phase, onCreateCoins, onShake, onPour, onReset }: ChatPanelProps) {
    const [inputText, setInputText] = useState('')
    const [coinsPerPerson, setCoinsPerPerson] = useState(1)

    // 쉼표 또는 줄바꿈으로 분리 → 트림 → 중복 제거
    const parseNames = (text: string): string[] => {
        const seen = new Set<string>()
        return text
            .split(/[,\n]/)
            .map(s => s.trim())
            .filter(s => s.length > 0)
            .filter(name => {
                const key = name.toLowerCase()
                if (seen.has(key)) return false
                seen.add(key)
                return true
            })
    }

    const uniqueNames = parseNames(inputText)
    const totalCoins = uniqueNames.length * coinsPerPerson
    const isIdle = phase === 'idle'
    const isReady = phase === 'ready'
    const isBusy = phase === 'filling' || phase === 'shaking' || phase === 'pouring'

    const handleCreate = () => {
        if (uniqueNames.length === 0 || !(isIdle || isReady)) return
        onCreateCoins(uniqueNames, coinsPerPerson)
        // 입력창은 스스로 초기화하지 않음 (유지)
    }

    const handleResetAll = () => {
        if (window.confirm('입력된 이름과 게임판 위의 모든 코인이 삭제됩니다. 초기화하시겠습니까?')) {
            setInputText('')
            setCoinsPerPerson(1)
            onReset()
        }
    }

    // 단계별 상태 표시 텍스트
    const phaseLabel: Record<ShufflePhase, string> = {
        idle: '',
        filling: '📦 박스에 코인 쌓는 중...',
        ready: '✅ 코인 준비 완료!',
        shaking: '🔀 코인 섞는 중...',
        pouring: '💫 코인 쏟아지는 중...',
    }

    return (
        <div style={{
            position: 'absolute',
            bottom: '24px',
            left: '24px',
            zIndex: 30,
            width: '300px',
            background: 'rgba(5, 0, 26, 0.92)',
            border: '1px solid rgba(170, 68, 255, 0.5)',
            borderRadius: '14px',
            padding: '16px',
            backdropFilter: 'blur(14px)',
            boxShadow: '0 0 24px rgba(170,68,255,0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            fontFamily: 'Inter, sans-serif',
        }}>
            {/* 제목 + 초기화 버튼 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '18px' }}>⭐</span>
                    <span style={{ color: '#CC88FF', fontWeight: 700, fontSize: '13px', letterSpacing: '1px' }}>
                        스타 코인 생성기
                    </span>
                </div>
                <button
                    onClick={(e) => { e.stopPropagation(); handleResetAll() }}
                    style={{
                        background: 'rgba(255,0,0,0.15)',
                        border: '1px solid rgba(255,0,0,0.3)',
                        color: '#ff4444',
                        fontSize: '11px',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    새 게임
                </button>
            </div>

            {/* 단계 표시 (진행 중일 때) */}
            {phase !== 'idle' && (
                <div style={{
                    background: 'rgba(170,68,255,0.12)',
                    border: '1px solid rgba(170,68,255,0.3)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    color: '#CC88FF',
                    fontSize: '12px',
                    fontWeight: 600,
                    textAlign: 'center',
                    letterSpacing: '0.5px',
                }}>
                    {phaseLabel[phase]}
                </div>
            )}

            {/* 이름 입력 (항상 표시하지만 진행 중엔 편집 못하게 할 수 있음) */}
            <div>
                <div style={{ color: '#888', fontSize: '11px', marginBottom: '6px' }}>
                    쉼표 또는 줄바꿈으로 이름 구분
                </div>
                <textarea
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    onClick={e => e.stopPropagation()}
                    disabled={isBusy}
                    placeholder={'홍길동, 김철수, 이수동\n또는 한 줄에 한 명씩'}
                    rows={4}
                    style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(170,68,255,0.3)',
                        borderRadius: '8px',
                        color: '#e8d8ff',
                        padding: '10px',
                        fontSize: '13px',
                        resize: 'vertical',
                        outline: 'none',
                        lineHeight: '1.6',
                        boxSizing: 'border-box',
                        fontFamily: 'monospace',
                        opacity: isBusy ? 0.6 : 1,
                    }}
                />
            </div>

            {/* 파싱 결과 미리보기 */}
            {inputText.trim() && (
                <div style={{
                    background: 'rgba(170,68,255,0.08)',
                    border: '1px solid rgba(170,68,255,0.25)',
                    borderRadius: '8px',
                    padding: '8px 10px',
                    fontSize: '12px',
                    opacity: isBusy ? 0.6 : 1,
                }}>
                    <div style={{ color: '#aaa', marginBottom: '4px' }}>
                        👥{' '}
                        <span style={{ color: '#CC88FF', fontWeight: 700 }}>
                            {uniqueNames.length}명
                        </span>
                        {' '}· 총{' '}
                        <span style={{ color: '#FFD700', fontWeight: 700 }}>
                            {totalCoins}코인
                        </span>
                    </div>
                    <div style={{ color: '#ccc', maxHeight: '44px', overflowY: 'auto', fontSize: '11px', lineHeight: '1.6' }}>
                        {uniqueNames.join(' · ')}
                    </div>
                </div>
            )}

            {/* 인원당 코인 슬라이더 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: isBusy ? 0.6 : 1 }}>
                <span style={{ color: '#aaa', fontSize: '12px', whiteSpace: 'nowrap' }}>인원당 코인</span>
                <input
                    type="range" min={1} max={10}
                    value={coinsPerPerson}
                    onChange={e => setCoinsPerPerson(Number(e.target.value))}
                    onClick={e => e.stopPropagation()}
                    disabled={isBusy}
                    style={{ flex: 1, accentColor: '#AA44FF' }}
                />
                <span style={{ color: '#CC88FF', fontWeight: 700, fontSize: '13px', minWidth: '28px', textAlign: 'right' }}>
                    ×{coinsPerPerson}
                </span>
            </div>

            {/* ── 버튼 영역 ── */}

            {/* [1] 코인 생성 (Idle 또는 Ready 상태) */}
            {(isIdle || isReady) && (
                <button
                    onClick={e => { e.stopPropagation(); handleCreate() }}
                    disabled={uniqueNames.length === 0}
                    style={btn(uniqueNames.length > 0, '#7700CC', '#AA44FF')}
                >
                    📦 {isIdle ? '코인 생성' : '추가 코인 생성'} {totalCoins > 0 ? `(${totalCoins}개)` : ''}
                </button>
            )}

            {/* [2] 코인 섞기 (Ready 상태) */}
            {isReady && (
                <button
                    onClick={e => { e.stopPropagation(); onShake() }}
                    style={btn(true, '#005588', '#0099FF')}
                >
                    🔀 코인 섞기
                </button>
            )}

            {/* [3] 코인 퍼붓기 (Ready 상태) */}
            {isReady && (
                <button
                    onClick={e => { e.stopPropagation(); onPour() }}
                    style={btn(true, '#AA3300', '#FF5500')}
                >
                    🎰 코인 퍼붓기!
                </button>
            )}

            {/* 진행 중 취소 불가 안내 */}
            {isBusy && (
                <div style={{ color: '#666', fontSize: '11px', textAlign: 'center' }}>
                    진행 중... 잠시 기다려주세요
                </div>
            )}
        </div>
    )
}

// 버튼 공통 스타일 헬퍼
function btn(active: boolean, from: string, to: string): React.CSSProperties {
    return {
        width: '100%',
        padding: '11px',
        borderRadius: '8px',
        border: 'none',
        background: active ? `linear-gradient(90deg, ${from}, ${to})` : 'rgba(255,255,255,0.08)',
        color: active ? '#fff' : '#555',
        fontWeight: 700,
        fontSize: '14px',
        cursor: active ? 'pointer' : 'not-allowed',
        transition: 'all 0.2s',
        letterSpacing: '0.5px',
        boxShadow: active ? `0 0 14px ${to}66` : 'none',
    }
}
