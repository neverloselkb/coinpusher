
export default function PrivacyPolicy() {
    return (
        <div className="page-container" style={{ maxWidth: '800px' }}>
            <h1 style={{ color: '#FFD700', borderBottom: '1px solid #FFD700', paddingBottom: '0.5rem', marginBottom: '2rem' }}>
                개인정보처리방침 (Privacy Policy)
            </h1>

            <div style={{ lineHeight: 1.8, color: '#e0e0e0' }}>
                <p>
                    <strong>스타 코인 푸셔 (Star Coin Pusher)</strong>에 방문해 주셔서 감사합니다. 저희 운영진은 사용자의 개인정보 보호를 최우선으로 생각하며, 이하와 같이 개인정보 취급과 관련된 정책을 고지합니다.
                </p>

                <h3 style={{ marginTop: '2rem', color: '#fff' }}>1. 수집하는 개인정보 항목</h3>
                <p>
                    이 서비스는 로컬 환경 및 클라이언트 브라우저 상에서 동작하는 것을 기본 원칙으로 합니다. 사용자가 입력하는 '채팅 로그' 또는 '채팅 참여자 이름'은 일시적으로 브라우저의 메모리 상에만 존재하며, 당사의 서버나 제3자에게 전송, 보관, 활용되지 않습니다.
                    <br />단, 원활한 서비스 제공을 위해 브라우저 쿠키(Cookies)나 로컬 스토리지(Local Storage)를 사용할 수 있습니다.
                </p>

                <h3 style={{ marginTop: '2rem', color: '#fff' }}>2. 자동 수집되는 정보 및 광고 송출 (구글 애드센스 등)</h3>
                <p>
                    본 웹사이트는 구글(Google)과 같은 타사 광고 업체를 통해 광고를 게재할 수 있습니다. 이러한 업체는 구글 애드센스를 포함하여 정보를 수집하기 위해 쿠키(Cookies)를 사용할 수 있으며, 귀하가 본 웹사이트 및 인터넷의 다른 웹사이트를 방문한 기록을 바탕으로 광고를 제공할 수 있습니다.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                    <li>Google을 포함한 타사 공급업체는 쿠키를 사용하여 사용자의 이전 웹사이트 방문 기록 및 디바이스 특성을 기반으로 광고를 게재합니다.</li>
                    <li>Google에서 광고 쿠키를 사용하면 Google 및 해당 파트너가 당사 사이트 및 인터넷의 다른 사이트 방문을 기반으로 사용자에게 적절한 타겟팅 광고를 보여줄 수 있습니다.</li>
                    <li>사용자는 <a href="https://myadcenter.google.com/" target="_blank" rel="noreferrer" style={{ color: '#00FFEE' }}>Google 광고 설정</a>을 방문하여 맞춤형 광고에서 제외할 수 있습니다.</li>
                </ul>

                <h3 style={{ marginTop: '2rem', color: '#fff' }}>3. 로그 수집 및 분석</h3>
                <p>
                    오류 분석이나 성능 개선을 위해 Google Analytics와 같은 써드파티 통계 분석 도구를 사용할 수 있습니다. 이를 통해 수집되는 데이터는 익명화된 비식별 데이터로, 개인을 특정할 수 없습니다.
                </p>

                <h3 style={{ marginTop: '2rem', color: '#fff' }}>4. 개인정보의 보유 및 파기 절차</h3>
                <p>
                    개인식별정보를 직접 수집하지 않으므로 물리적인 보유/파기의 대상이 존재하지 않으며, 클라이언트 브라우저의 캐시나 쿠키 데이터는 귀하의 브라우저 설정에 따라 직접 언제든지 삭제하실 수 있습니다.
                </p>

                <h3 style={{ marginTop: '2rem', color: '#fff' }}>5. 정책 변경에 관련된 고지</h3>
                <p>
                    향후 서비스가 발전하여 기능이 추가되거나 관계 법령에 의해 방침이 변경될 경우, 이 페이지를 통해 지체 없이 공지할 수 있도록 하겠습니다.
                </p>
                <p style={{ marginTop: '2rem', color: '#888' }}>시행 일자: 2026년 2월</p>
            </div>

            <footer style={{ textAlign: 'center', color: '#666', borderTop: '1px solid #333', padding: '2rem 0', marginTop: '4rem' }}>
                <p>Copyright © 2026 Data Laundry & Antigravity AI. All rights reserved.</p>
            </footer>
        </div>
    )
}
