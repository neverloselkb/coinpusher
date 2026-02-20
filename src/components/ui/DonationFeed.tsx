import './DonationFeed.css'

export interface DonationItem {
    id: number
    username: string
    amount: number
    timestamp: number
}

interface DonationFeedProps {
    donations: DonationItem[]
}

/**
 * 좌측에 표시되는 도네이션 알림 카드
 * 이미지의 "Donation! +1000 Cheese (User_777)" 구현
 */
export default function DonationFeed({ donations }: DonationFeedProps) {
    // 최근 3개만 표시
    const recent = donations.slice(-3).reverse()

    return (
        <div className="donation-feed">
            {recent.map((d, idx) => (
                <div
                    key={d.id}
                    className="donation-card"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                >
                    {/* 치즈 아이콘 */}
                    <div className="donation-icon">🧀</div>
                    <div className="donation-content">
                        <div className="donation-title">Donation!</div>
                        <div className="donation-amount">+{d.amount.toLocaleString()} Cheese</div>
                        <div className="donation-user">({d.username})</div>
                    </div>
                </div>
            ))}
        </div>
    )
}
