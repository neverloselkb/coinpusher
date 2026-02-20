import { RigidBody } from '@react-three/rapier'

// 코인 푸셔 게임 스테이지 - 오락실 기계 본체 스타일
export default function Stage() {
    return (
        <group>
            {/* === 바닥 (고반사 어두운 머티리얼) === */}
            <RigidBody type="fixed" friction={0.7} restitution={0.2} name="floor">
                {/* 시각적 바닥 - 얇은 평면 (렌더링용) */}
                <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                    <planeGeometry args={[20, 30]} />
                    <meshStandardMaterial
                        color="#160830"
                        metalness={0.7}
                        roughness={0.2}
                        envMapIntensity={1.5}
                    />
                </mesh>
                {/* 물리적 바닥층 - 터널링 방지를 위해 아래로 두껍게(두께 4) 세팅 (눈에 안 보임) */}
                <mesh position={[0, -2, 0]}>
                    <boxGeometry args={[20, 4, 30]} />
                    <meshBasicMaterial visible={false} />
                </mesh>
            </RigidBody>

            {/* === 바닥 그리드 라인 (발광 격자) === */}
            {/* 바닥 위에 얇게 overlaid - 네온 그리드 효과 */}
            {Array.from({ length: 7 }, (_, i) => i * 3.3 - 10).map((x, i) => (
                <mesh key={`vl${i}`} position={[x, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[0.04, 30]} />
                    <meshStandardMaterial
                        color="#2200FF"
                        emissive="#0033FF"
                        emissiveIntensity={1.5}
                        transparent
                        opacity={0.6}
                    />
                </mesh>
            ))}
            {Array.from({ length: 11 }, (_, i) => i * 3 - 15).map((z, i) => (
                <mesh key={`hl${i}`} position={[0, 0.01, z]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[20, 0.04]} />
                    <meshStandardMaterial
                        color="#2200FF"
                        emissive="#0033FF"
                        emissiveIntensity={1.5}
                        transparent
                        opacity={0.6}
                    />
                </mesh>
            ))}

            {/* === 벽 (물리 충돌 + 반투명 유리 패널) === */}
            <RigidBody type="fixed" friction={0.3}>
                {/* 왼쪽 유리벽 - 핑크 네온 */}
                <mesh position={[-10, 2.5, 0]} castShadow receiveShadow>
                    <boxGeometry args={[0.3, 5, 30]} />
                    <meshStandardMaterial
                        color="#FF2080"
                        metalness={0.1}
                        roughness={0.0}
                        transparent
                        opacity={0.18}
                        emissive="#FF0060"
                        emissiveIntensity={0.8}
                    />
                </mesh>

                {/* 오른쪽 유리벽 - 시안 네온 */}
                <mesh position={[10, 2.5, 0]} castShadow receiveShadow>
                    <boxGeometry args={[0.3, 5, 30]} />
                    <meshStandardMaterial
                        color="#00FFEE"
                        metalness={0.1}
                        roughness={0.0}
                        transparent
                        opacity={0.18}
                        emissive="#00DDCC"
                        emissiveIntensity={0.8}
                    />
                </mesh>

                {/* 뒤쪽 벽 - 어두운 메탈 패널 */}
                <mesh position={[0, 2.5, -15]} castShadow receiveShadow>
                    <boxGeometry args={[20, 5, 0.3]} />
                    <meshStandardMaterial
                        color="#0A000F"
                        metalness={0.9}
                        roughness={0.1}
                        envMapIntensity={1.5}
                    />
                </mesh>
            </RigidBody>

            {/* === 네온 테두리 바 (바닥 가장자리 발광) === */}
            {/* 왼쪽 핑크 네온 바 */}
            <mesh position={[-9.85, 0.05, 0]}>
                <boxGeometry args={[0.06, 0.06, 30]} />
                <meshStandardMaterial
                    color="#FF2080"
                    emissive="#FF0060"
                    emissiveIntensity={5}
                />
            </mesh>
            {/* 오른쪽 시안 네온 바 */}
            <mesh position={[9.85, 0.05, 0]}>
                <boxGeometry args={[0.06, 0.06, 30]} />
                <meshStandardMaterial
                    color="#00FFEE"
                    emissive="#00DDCC"
                    emissiveIntensity={5}
                />
            </mesh>
            {/* 앞쪽 보라 네온 바 */}
            <mesh position={[0, 0.05, 15]}>
                <boxGeometry args={[20, 0.06, 0.06]} />
                <meshStandardMaterial
                    color="#AA44FF"
                    emissive="#8800FF"
                    emissiveIntensity={5}
                />
            </mesh>
            {/* 뒤쪽 황금 네온 바 */}
            <mesh position={[0, 0.05, -15]}>
                <boxGeometry args={[20, 0.06, 0.06]} />
                <meshStandardMaterial
                    color="#FFD700"
                    emissive="#FF8800"
                    emissiveIntensity={5}
                />
            </mesh>

            {/* === 뒤쪽 벽 위 네온 장식 === */}
            {/* 상단 수평 바 - 핑크 */}
            <mesh position={[0, 5.1, -14.8]}>
                <boxGeometry args={[20, 0.1, 0.1]} />
                <meshStandardMaterial
                    color="#FF2080"
                    emissive="#FF0060"
                    emissiveIntensity={4}
                />
            </mesh>
            {/* 하단 수평 바 - 시안 */}
            <mesh position={[0, -0.05, -14.8]}>
                <boxGeometry args={[20, 0.1, 0.1]} />
                <meshStandardMaterial
                    color="#00FFEE"
                    emissive="#00DDCC"
                    emissiveIntensity={4}
                />
            </mesh>
        </group>
    )
}
