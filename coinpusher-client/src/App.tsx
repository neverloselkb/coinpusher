import { useState, useEffect } from 'react'
import GameScene from './components/GameScene'
import './app.css'

// 좌측 네온 문구 목록
const LEFT_SLOGANS = [
    '인생은 한방!',
    '코인아 떨어져라!',
    '오늘 운이 좋다!',
    '더 밀어야죠?',
    '지금이 기회다!',
    '대박의 신이여!',
]

// 우측 네온 문구 목록
const RIGHT_SLOGANS = [
    '오늘은 내 날!',
    '한 번만 믿어봐!',
    '잭팟이다아아!',
    '코인이 굴러온다!',
    '포기란 없다!',
    '운명을 믿어라!',
]

function App() {
    const [leftIdx, setLeftIdx] = useState(0)
    const [rightIdx, setRightIdx] = useState(0)

    // 3초마다 좌/우 문구를 각각 순환
    useEffect(() => {
        const timer = setInterval(() => {
            setLeftIdx(prev => (prev + 1) % LEFT_SLOGANS.length)
            setRightIdx(prev => (prev + 1) % RIGHT_SLOGANS.length)
        }, 3000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="app-root">
            <div className="arcade-bg" />
            <div className="game-canvas-wrapper">
                <GameScene />
            </div>
            <div className="hud-overlay">
                {/* key가 바뀌면 React가 요소를 재마운트 → CSS animation 재실행 */}
                <div key={`left-${leftIdx}`} className="neon-sign neon-sign-left neon-fade">
                    {LEFT_SLOGANS[leftIdx]}
                </div>
                <div key={`right-${rightIdx}`} className="neon-sign neon-sign-right neon-fade">
                    {RIGHT_SLOGANS[rightIdx]}
                </div>

            </div>
        </div>
    )
}

export default App
