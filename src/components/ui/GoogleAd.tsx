import React from 'react'

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

export default function GoogleAd(_props: GoogleAdProps) {
    // 왜: 애드센스 정책 승인 전까지 모든 광고 영역을 히든 처리
    // 승인 완료 후 이 컴포넌트를 원래대로 복원하면 됩니다.
    return null
}
