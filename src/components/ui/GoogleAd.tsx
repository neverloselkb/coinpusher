import React, { useEffect } from 'react'

interface GoogleAdProps {
    /** 광고 단위가 차지할 너비 */
    width?: number | string
    /** 광고 단위가 차지할 높이 */
    height?: number | string
    /** 테스트/개발용으로 광고 대신 표시할 텍스트 */
    placeholderText?: string
    /** 커스텀 스타일 */
    style?: React.CSSProperties
    /** 광고 포맷 (예: auto) */
    format?: string
    /** 반응형 여부 (예: true) */
    responsive?: string
}

export default function GoogleAd({ width = '100%', height = 90, placeholderText = '광고 노출 영역', style, format, responsive }: GoogleAdProps) {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

    // 실제 프로덕션 환경에서는 이 부분에 광고 스크립트 실행 로직이 동작합니다.
    useEffect(() => {
        if (!isLocal) {
            try {
                const adsbygoogle = (window as any).adsbygoogle || []
                adsbygoogle.push({})
            } catch (e) {
                console.error('AdSense Error:', e)
            }
        }
    }, [isLocal])
    if (isLocal) {
        return (
            <div style={{
                width,
                height,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px dashed rgba(255, 255, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.4)',
                fontSize: '12px',
                fontFamily: 'sans-serif',
                textAlign: 'center',
                borderRadius: '8px',
                pointerEvents: 'none', // 게임 클릭을 방해하지 않도록
                ...style // 외부 스타일 병합
            }}>
                <div>
                    [AdSense Placeholder]<br />
                    {placeholderText}<br />
                    {width} x {height}<br />
                    {format && `format: ${format}`} {responsive && `responsive: ${responsive}`}
                </div>
            </div>
        )
    }

    return (
        <div style={{ width, height, overflow: 'hidden', ...style }}>
            <ins className="adsbygoogle"
                style={{ display: 'block', width, height }}
                data-ad-client="ca-pub-6113754179867162"
                data-ad-format={format || "auto"}
                data-full-width-responsive={responsive || "true"}>
            </ins>
        </div>
    )
}
