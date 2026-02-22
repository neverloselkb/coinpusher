import { useNavigate } from 'react-router-dom'
import GoogleAd from '../components/ui/GoogleAd'

export default function Home() {
    const navigate = useNavigate()

    return (
        <div className="page-container">
            <h1 style={{ color: '#00FFEE', fontSize: '3rem', textAlign: 'center', marginBottom: '1rem', fontFamily: '"Press Start 2P"' }}>
                STAR COIN PUSHER
            </h1>
            <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#ccc', marginBottom: '3rem' }}>
                인터넷 방송(유튜브, 트위치 등) 시청자와 함께 즐기는 실시간 3D 코인 푸셔 웹 게임
            </p>

            {/* 상단 텍스트 광고 자리 안내 */}
            <div style={{ margin: '2rem auto', maxWidth: '728px' }}>
                <GoogleAd style={{ display: 'block' }} format="auto" responsive="true" />
            </div>

            <section style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
                <h2 style={{ color: '#FF2080', borderBottom: '1px solid #FF2080', paddingBottom: '0.5rem' }}>게임 소개</h2>
                <p style={{ lineHeight: 1.6, color: '#e0e0e0', marginTop: '1rem' }}>
                    <strong>스타 코인 푸셔(Star Coin Pusher)</strong>는 예전 오락실에서 볼 수 있었던 클래식 메달 게임(동전 밀어내기)을 모티브로 삼아, 현대 웹 3D 기술력으로 재해석한 무료 브라우저 게임입니다.
                    <br /><br />
                    키보드나 조이스틱 없이 오로지 '채팅'으로 참여하는 이 게임은 스트리머와 시청자가 소통하고 콘텐츠를 이끌어나갈 수 있게 도와줍니다. 방송 화면 한편에 띄워두고 시청자들이 남긴 채팅 시그널을 복사해 넣으면 수많은 시청자들의 코인이 화려한 네온 빛과 함께 쏟아져 내립니다.
                </p>
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <button
                        onClick={() => navigate('/play')}
                        style={{
                            padding: '1rem 3rem',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            backgroundColor: '#FF2080',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            boxShadow: '0 0 15px rgba(255, 32, 128, 0.6)',
                            transition: 'all 0.2s',
                        }}
                    >
                        오락실 입장하기
                    </button>
                </div>
            </section>

            <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px' }}>
                    <h3 style={{ color: '#FFD700' }}>✨ 주요 특징</h3>
                    <ul style={{ lineHeight: 1.6, color: '#e0e0e0', paddingLeft: '1.2rem', marginTop: '1rem' }}>
                        <li><strong>리얼한 물리 엔진</strong>: 실제 게임 센터에 있는 것 같은 동전의 무게감과 미끄러짐을 완벽하게 구현했습니다.</li>
                        <li><strong>시청자 참여 기반</strong>: 이름을 입력하면 그 이름이 새겨진 코인이 드롭됩니다. 뽑기 대용 시스템으로 완벽합니다.</li>
                        <li><strong>시각적인 네온 이펙트</strong>: 사이버펑크 디자인으로 방송을 한층 더 화려하게 만들어줍니다.</li>
                        <li><strong>다운로드 불필요</strong>: 설치 없이 어떤 브라우저에서든 클릭 한 번으로 가볍게 구동됩니다.</li>
                    </ul>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px' }}>
                    <h3 style={{ color: '#00FFEE' }}>🕹️ 조작 및 사용법</h3>
                    <ol style={{ lineHeight: 1.6, color: '#e0e0e0', paddingLeft: '1.2rem', marginTop: '1rem' }}>
                        <li>위의 '오락실 입장하기' 버튼을 눌러 3D 화면에 진입합니다.</li>
                        <li>좌측 하단의 <strong>스타 코인 생성기</strong>에 유튜브나 트위치의 채팅 텍스트를 그대로 넣습니다.</li>
                        <li>'코인 생성' 버튼을 누르면 인원이 집계되어 공중 박스에 코인이 쏟아집니다.</li>
                        <li>'퍼붓기'를 눌러 게임판에 투하하여 앞쪽으로 메달을 밀어내세요.</li>
                        <li>가장 먼저 바닥으로 떨어진 코인이 1등을 차지합니다!</li>
                    </ol>
                </div>
            </section>

            {/* 하단 텍스트 광고 자리 안내 */}
            <div style={{ margin: '2rem auto', maxWidth: '728px' }}>
                <GoogleAd style={{ display: 'block' }} format="auto" responsive="true" />
            </div>

            <footer style={{ textAlign: 'center', color: '#666', borderTop: '1px solid #333', padding: '2rem 0', marginTop: '4rem' }}>
                <p>Copyright © 2026 Data Laundry & Antigravity AI. All rights reserved.</p>
                <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>This game is free to use for live streaming entertainment.</p>
            </footer>
        </div>
    )
}
