import { useNavigate } from 'react-router-dom'
import GoogleAd from '../components/ui/GoogleAd'

/**
 * Home 페이지 - 사이트의 메인 랜딩 페이지
 * - 왜: 애드센스 정책상 "충분한 고유 콘텐츠"와 "사용자가 재방문할 이유"를 제공해야 함
 * - 게임 소개, 아케이드 문화 배경, 활용 시나리오, 시스템 요구사항 등 풍부한 콘텐츠 포함
 */
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

            {/* 상단 광고 */}
            <div style={{ margin: '2rem auto', maxWidth: '728px' }}>
                <GoogleAd style={{ display: 'block' }} format="auto" responsive="true" />
            </div>

            {/* ─── 1. 게임 소개 (확장) ─── */}
            <section style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
                <h2 style={{ color: '#FF2080', borderBottom: '1px solid #FF2080', paddingBottom: '0.5rem' }}>게임 소개</h2>
                <p style={{ lineHeight: 1.8, color: '#e0e0e0', marginTop: '1rem' }}>
                    <strong>스타 코인 푸셔(Star Coin Pusher)</strong>는 예전 오락실에서 볼 수 있었던 클래식 메달 게임(동전 밀어내기)을 모티브로 삼아, 현대 웹 3D 기술력으로 재해석한 무료 브라우저 게임입니다.
                </p>
                <p style={{ lineHeight: 1.8, color: '#e0e0e0', marginTop: '1rem' }}>
                    키보드나 조이스틱 없이 오로지 <strong>'채팅'</strong>으로 참여하는 이 게임은 스트리머와 시청자가 소통하고 콘텐츠를 이끌어나갈 수 있게 도와줍니다. 방송 화면 한편에 띄워두고 시청자들이 남긴 채팅 시그널을 복사해 넣으면 수많은 시청자들의 코인이 화려한 네온 빛과 함께 쏟아져 내립니다.
                </p>
                <p style={{ lineHeight: 1.8, color: '#e0e0e0', marginTop: '1rem' }}>
                    실제 오락실 기계와 동일하게, 위에서 떨어진 코인이 기존에 쌓여 있던 코인을 밀어내고, 가장자리로 떨어지는 코인이 승자가 됩니다.
                    물리 엔진이 적용되어 코인끼리 부딪히고, 밀리고, 미끄러지는 <strong>현실감 있는 움직임</strong>을 제공합니다.
                    뽑기나 추첨 대용으로, 또는 방송의 쉬는 시간을 채우는 콘텐츠로 당장 활용해보세요!
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

            {/* ─── 2. 주요 특징 + 조작법 (기존) ─── */}
            <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px' }}>
                    <h3 style={{ color: '#FFD700' }}>✨ 주요 특징</h3>
                    <ul style={{ lineHeight: 1.8, color: '#e0e0e0', paddingLeft: '1.2rem', marginTop: '1rem' }}>
                        <li><strong>리얼한 물리 엔진</strong>: 실제 게임 센터에 있는 것 같은 동전의 무게감과 미끄러짐을 완벽하게 구현했습니다.</li>
                        <li><strong>시청자 참여 기반</strong>: 이름을 입력하면 그 이름이 새겨진 코인이 드롭됩니다. 뽑기 대용 시스템으로 완벽합니다.</li>
                        <li><strong>시각적인 네온 이펙트</strong>: 사이버펑크 디자인으로 방송을 한층 더 화려하게 만들어줍니다.</li>
                        <li><strong>다운로드 불필요</strong>: 설치 없이 어떤 브라우저에서든 클릭 한 번으로 가볍게 구동됩니다.</li>
                        <li><strong>피버 모드</strong>: 피버 게이지가 가득 차면 화려한 이펙트와 보너스 코인이 투입됩니다.</li>
                    </ul>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px' }}>
                    <h3 style={{ color: '#00FFEE' }}>🕹️ 조작 및 사용법</h3>
                    <ol style={{ lineHeight: 1.8, color: '#e0e0e0', paddingLeft: '1.2rem', marginTop: '1rem' }}>
                        <li>위의 '오락실 입장하기' 버튼을 눌러 3D 화면에 진입합니다.</li>
                        <li>좌측 하단의 <strong>스타 코인 생성기</strong>에 유튜브나 트위치의 채팅 텍스트를 그대로 넣습니다.</li>
                        <li>'코인 생성' 버튼을 누르면 인원이 집계되어 공중 박스에 코인이 쏟아집니다.</li>
                        <li>'퍼붓기'를 눌러 게임판에 투하하여 앞쪽으로 메달을 밀어내세요.</li>
                        <li>가장 먼저 바닥으로 떨어진 코인이 1등을 차지합니다!</li>
                    </ol>
                </div>
            </section>

            {/* ─── 3. 코인 푸셔란? (신규) ─── */}
            <section style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
                <h2 style={{ color: '#FFD700', borderBottom: '1px solid #FFD700', paddingBottom: '0.5rem' }}>
                    🏛️ 코인 푸셔(Coin Dozer)란?
                </h2>
                <p style={{ lineHeight: 1.8, color: '#e0e0e0', marginTop: '1rem' }}>
                    <strong>코인 푸셔(Coin Pusher)</strong>, 일명 <strong>코인 도저(Coin Dozer)</strong> 또는 <strong>메달 게임</strong>은
                    1960년대 영국에서 처음 등장한 아케이드 게임입니다. 기계 상단에서 동전을 떨어뜨리면,
                    좌우로 움직이는 밀판(Pusher)이 기존에 쌓인 동전을 밀어서 가장자리로 떨어뜨리는 단순하면서도 중독적인 게임입니다.
                </p>
                <p style={{ lineHeight: 1.8, color: '#e0e0e0', marginTop: '1rem' }}>
                    한국에서는 1990~2000년대 오락실(아케이드 센터)의 메달 코너에서 큰 인기를 끌었으며,
                    일본에서는 <strong>'メダルゲーム(메달 게임)'</strong>이라는 이름으로 지금도 대형 게임센터에서 사랑받고 있습니다.
                    최근에는 유튜브에서 실제 코인 푸셔 플레이 영상이 ASMR 콘텐츠로 인기를 끌기도 합니다.
                </p>
                <p style={{ lineHeight: 1.8, color: '#e0e0e0', marginTop: '1rem' }}>
                    스타 코인 푸셔는 이러한 클래식 아케이드의 감성을 웹 3D로 재현하면서,
                    <strong>"시청자 참여"</strong>라는 새로운 요소를 더해 라이브 방송에 최적화된 경험을 제공합니다.
                    물리 엔진으로 구현된 코인의 움직임은 실제 기계에서 느끼는 손맛과 긴장감을 그대로 전달합니다.
                </p>
            </section>

            {/* ─── 4. 어떤 방송에 어울리나요? (신규) ─── */}
            <section style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
                <h2 style={{ color: '#FF2080', borderBottom: '1px solid #FF2080', paddingBottom: '0.5rem' }}>
                    📺 어떤 방송에 어울리나요?
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
                    <div style={{ backgroundColor: 'rgba(255, 0, 0, 0.06)', padding: '1.5rem', borderRadius: '8px', border: '1px solid rgba(255, 0, 0, 0.2)' }}>
                        <h3 style={{ color: '#FF0000', marginBottom: '0.5rem' }}>▶️ 유튜브 라이브</h3>
                        <p style={{ lineHeight: 1.6, color: '#e0e0e0' }}>
                            슈퍼챗 대신 채팅 참여로 코인을 생성하면 시청자 참여도가 자연스럽게 올라갑니다.
                            라이브 채팅의 열기를 시각적 콘텐츠로 전환하는 최고의 도구입니다.
                        </p>
                    </div>
                    <div style={{ backgroundColor: 'rgba(145, 70, 255, 0.06)', padding: '1.5rem', borderRadius: '8px', border: '1px solid rgba(145, 70, 255, 0.2)' }}>
                        <h3 style={{ color: '#9146FF', marginBottom: '0.5rem' }}>🟣 트위치</h3>
                        <p style={{ lineHeight: 1.6, color: '#e0e0e0' }}>
                            게임 방송 중간 쉬는 시간에 시청자 참여 이벤트로 활용하기 딱 좋습니다.
                            "!참여" 같은 명령어를 모아서 한 번에 퍼부으면 채팅창이 불탑니다.
                        </p>
                    </div>
                    <div style={{ backgroundColor: 'rgba(0, 102, 255, 0.06)', padding: '1.5rem', borderRadius: '8px', border: '1px solid rgba(0, 102, 255, 0.2)' }}>
                        <h3 style={{ color: '#0066FF', marginBottom: '0.5rem' }}>🔵 아프리카TV</h3>
                        <p style={{ lineHeight: 1.6, color: '#e0e0e0' }}>
                            BJ와 시청자 간의 소통을 극대화하는 참여형 콘텐츠입니다.
                            별풍선 이벤트와 결합하면 더욱 재미있는 방송을 만들 수 있습니다.
                        </p>
                    </div>
                    <div style={{ backgroundColor: 'rgba(0, 255, 100, 0.06)', padding: '1.5rem', borderRadius: '8px', border: '1px solid rgba(0, 255, 100, 0.2)' }}>
                        <h3 style={{ color: '#00FF64', marginBottom: '0.5rem' }}>🟢 치지직 / 기타</h3>
                        <p style={{ lineHeight: 1.6, color: '#e0e0e0' }}>
                            네이버 치지직(Chzzk)을 비롯한 모든 라이브 플랫폼에서 사용 가능합니다.
                            채팅 텍스트만 복사할 수 있으면 어디서든 즐길 수 있습니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── 5. 시스템 요구사항 (신규) ─── */}
            <section style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
                <h2 style={{ color: '#00FFEE', borderBottom: '1px solid #00FFEE', paddingBottom: '0.5rem' }}>
                    💻 시스템 요구사항
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1.5rem' }}>
                    <div>
                        <h3 style={{ color: '#FFD700', marginBottom: '0.5rem' }}>최소 사양</h3>
                        <ul style={{ lineHeight: 1.8, color: '#e0e0e0', paddingLeft: '1.2rem' }}>
                            <li><strong>브라우저</strong>: Chrome 90+, Firefox 78+, Edge 90+</li>
                            <li><strong>RAM</strong>: 4GB 이상</li>
                            <li><strong>GPU</strong>: WebGL 2.0 지원 (내장 그래픽 가능)</li>
                            <li><strong>인터넷</strong>: 최초 로딩 시에만 필요</li>
                        </ul>
                    </div>
                    <div>
                        <h3 style={{ color: '#00FFEE', marginBottom: '0.5rem' }}>권장 사양</h3>
                        <ul style={{ lineHeight: 1.8, color: '#e0e0e0', paddingLeft: '1.2rem' }}>
                            <li><strong>브라우저</strong>: Chrome 최신 버전 권장</li>
                            <li><strong>RAM</strong>: 8GB 이상</li>
                            <li><strong>GPU</strong>: 외장 그래픽 (NVIDIA/AMD)</li>
                            <li><strong>해상도</strong>: 1920×1080 이상</li>
                        </ul>
                    </div>
                </div>
                <div style={{ backgroundColor: 'rgba(255, 215, 0, 0.08)', border: '1px solid rgba(255, 215, 0, 0.2)', padding: '1rem', borderRadius: '8px', marginTop: '1.5rem' }}>
                    <p style={{ color: '#FFD700', margin: 0 }}>
                        💡 <strong>성능 팁</strong>: 코인 수가 많아지면 GPU 부하가 증가합니다. 저사양 환경에서는 "1인당 코인 수"를 1개로 설정하면 원활하게 플레이할 수 있습니다.
                    </p>
                </div>
            </section>

            {/* ─── 6. 하단 CTA 영역 (신규) ─── */}
            <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                <div
                    onClick={() => navigate('/guide')}
                    style={{
                        backgroundColor: 'rgba(0, 255, 238, 0.08)',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        border: '1px solid rgba(0, 255, 238, 0.2)',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s',
                    }}
                >
                    <h3 style={{ color: '#00FFEE', marginBottom: '0.5rem' }}>📖 가이드</h3>
                    <p style={{ color: '#999', fontSize: '0.9rem' }}>
                        OBS 설정, 채팅 활용법, 전략 팁을 확인하세요
                    </p>
                </div>
                <div
                    onClick={() => navigate('/faq')}
                    style={{
                        backgroundColor: 'rgba(255, 215, 0, 0.08)',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 215, 0, 0.2)',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s',
                    }}
                >
                    <h3 style={{ color: '#FFD700', marginBottom: '0.5rem' }}>❓ FAQ</h3>
                    <p style={{ color: '#999', fontSize: '0.9rem' }}>
                        자주 묻는 질문 17개와 상세 답변
                    </p>
                </div>
                <div
                    onClick={() => navigate('/updates')}
                    style={{
                        backgroundColor: 'rgba(139, 92, 246, 0.08)',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        border: '1px solid rgba(139, 92, 246, 0.2)',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'all 0.2s',
                    }}
                >
                    <h3 style={{ color: '#8B5CF6', marginBottom: '0.5rem' }}>📜 업데이트</h3>
                    <p style={{ color: '#999', fontSize: '0.9rem' }}>
                        개발 히스토리와 향후 로드맵 확인
                    </p>
                </div>
            </section>

            {/* 하단 광고 */}
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
