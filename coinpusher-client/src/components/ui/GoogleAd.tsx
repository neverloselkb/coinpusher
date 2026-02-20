import React, { useEffect, useRef } from 'react'

interface GoogleAdProps {
    /** 광고 단위가 차지할 너비 */
    width?: number | string
    /** 광고 단위가 차지할 높이 */
    height?: number | string
    /** 테스트/개발용으로 광고 대신 표시할 텍스트 */
    placeholderText?: string
}

export default function GoogleAd({ width = 300, height = 250, placeholderText = '광고 노출 영역' }: GoogleAdProps) {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

    // 실제 프로덕션 환경에서는 이 부분에 광고 스크립트 실행 로직이 들어갑니다.
    // useEffect(() => {
    //     try {
    //         const adsbygoogle = (window as any).adsbygoogle || []
    //         adsbygoogle.push({})
    //     } catch (e) {
    //         console.error('AdSense Error:', e)
    //     }
    // }, [])

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
                pointerEvents: 'none' // 게임 클릭을 방해하지 않도록
            }}>
                <div>
                    [AdSense Placeholder]<br />
                    {placeholderText}<br />
                    {width} x {height}
                </div>
            </div>
        )
    }

    return (
        <div style={{ width, height, overflow: 'hidden' }}>
            {/* 여기에 나중에 발급받을 구글 애드센스 <ins> 태그를 삽입하세요 */}
            {/* 예시:
            <ins className="adsbygoogle"
                 style={{ display: 'block', width, height }}
                 data-ad-client="ca-pub-YYYYYYYYYYYYYYY"
                 data-ad-slot="XXXXXXXXXX"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
            */}
        </div>
    )
}
