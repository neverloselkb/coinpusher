import { useEffect, useState } from 'react'
import './BettingGoalBar.css'

interface BettingGoalBarProps {
    current: number
    goal: number
}

/**
 * 상단 중앙에 표시되는 베팅 목표 진행 바
 * 이미지의 "Betting Goal: 25/50" 컴포넌트 구현
 */
export default function BettingGoalBar({ current, goal }: BettingGoalBarProps) {
    const [displayCurrent, setDisplayCurrent] = useState(0)
    const percent = Math.min((displayCurrent / goal) * 100, 100)

    // 숫자가 변할 때 애니메이션으로 증가
    useEffect(() => {
        const timer = setInterval(() => {
            setDisplayCurrent(prev => {
                if (prev < current) return prev + 1
                clearInterval(timer)
                return prev
            })
        }, 30)
        return () => clearInterval(timer)
    }, [current])

    return (
        <div className="betting-goal-bar">
            <div className="betting-goal-label">
                Betting Goal: <span className="betting-count">{displayCurrent}/{goal}</span>
            </div>
            <div className="betting-progress-track">
                <div
                    className="betting-progress-fill"
                    style={{ width: `${percent}%` }}
                />
                {/* 반짝이는 하이라이트 */}
                <div className="betting-progress-shine" style={{ width: `${percent}%` }} />
            </div>
        </div>
    )
}
