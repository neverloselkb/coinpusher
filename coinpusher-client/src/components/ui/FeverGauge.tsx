import './FeverGauge.css'

interface FeverGaugeProps {
    /** 0 ~ 100 */
    level: number
    isFever: boolean
}

/**
 * 우측 세로 피버 게이지
 * 이미지의 "FEVER" 불꽃 게이지 구현
 */
export default function FeverGauge({ level, isFever }: FeverGaugeProps) {
    return (
        <div className={`fever-gauge ${isFever ? 'fever-active' : ''}`}>
            <div className="fever-label">FEVER</div>

            {/* 피버 상태일 때 불꽃 이펙트 */}
            {isFever && (
                <div className="fever-flame">
                    <span>🔥</span>
                    <span>🔥</span>
                    <span>🔥</span>
                </div>
            )}

            {/* 게이지 트랙 */}
            <div className="fever-track">
                {/* 눈금선 */}
                {[0, 25, 50, 75, 100].map(mark => (
                    <div
                        key={mark}
                        className="fever-mark"
                        style={{ bottom: `${mark}%` }}
                    />
                ))}
                {/* 충전된 게이지 */}
                <div
                    className="fever-fill"
                    style={{ height: `${level}%` }}
                />
                {/* 상단 불꽃 */}
                {level > 10 && (
                    <div
                        className="fever-tip"
                        style={{ bottom: `${level}%` }}
                    >🔥</div>
                )}
            </div>

            {/* 피버 텍스트 */}
            {isFever && <div className="fever-text-active">🔥 FEVER! 🔥</div>}
        </div>
    )
}
