import { useFrame } from '@react-three/fiber'
import { RigidBody, RapierRigidBody } from '@react-three/rapier'
import { useRef } from 'react'
import { Vector3 } from 'three'
import { useControls } from 'leva'

// 코인 반지름 1.5 기준, 바닥에 눕혀지면 코인 두께(0.35)만큼 높이 차지
// 막대는 바닥에서 코인을 밀어야 하므로 낮게 위치
const PUSHER_Y = 0.8          // 막대 중심 Y (코인 위에 얹히는 높이)
const PUSHER_HEIGHT = 1.6     // 막대 높이 (코인 쌓임 2~3겹 커버)
const PUSHER_HALF_DEPTH = 15  // 막대 깊이의 절반 (뒷벽까지 채움)

export default function Pusher() {
    const api = useRef<RapierRigidBody>(null)

    const { speed, range, offset } = useControls('Pusher', {
        speed: { value: 1.5, min: 0.1, max: 5 },
        range: { value: 8, min: 1, max: 15 },
        // offset: 앞면이 최대로 나왔을 때 Z 위치 (양수에 가까울수록 더 앞으로)
        offset: { value: -2, min: -10, max: 5 }
    })

    useFrame(({ clock }) => {
        if (!api.current) return

        const t = clock.getElapsedTime()
        // 막대 앞면이 왕복하는 Z 위치 (range/2 만큼 ±로 움직임)
        const pusherFrontZ = Math.sin(t * speed) * (range / 2) + offset

        // 앞면 위치에서 반 깊이를 빼면 중심 위치
        const centerZ = pusherFrontZ - PUSHER_HALF_DEPTH

        api.current.setNextKinematicTranslation(
            new Vector3(0, PUSHER_Y, centerZ)
        )
    })

    return (
        <group>
            <RigidBody
                ref={api}
                type="kinematicPosition"
                name="pusher"
                // 초기 위치: 앞면이 offset에 오도록 중심을 뒤로
                position={[0, PUSHER_Y, offset - PUSHER_HALF_DEPTH]}
                friction={0.8}   // 마찰 올림: 코인을 잘 밀어내도록
                restitution={0.1}
            >
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[18, PUSHER_HEIGHT, PUSHER_HALF_DEPTH * 2]} />
                    <meshStandardMaterial color="#ff9900" roughness={0.3} metalness={0.8} />
                </mesh>
            </RigidBody>

            {/* 안전망: 푸셔가 앞으로 전진할 때 뒤나 아래로 코인이 빠지지 않도록
                푸셔 기본 위치의 뒤쪽 공간을 덮는 고정된 보이지 않는 바닥을 추가 */}
            <RigidBody type="fixed" friction={0.5} restitution={0.1}>
                {/* 푸셔 뒤쪽 공간 (Z = -20 근처) */}
                <mesh position={[0, PUSHER_Y - PUSHER_HEIGHT / 2 + 0.1, -15 - PUSHER_HALF_DEPTH / 2]}>
                    <boxGeometry args={[19, 0.2, PUSHER_HALF_DEPTH]} />
                    <meshBasicMaterial visible={false} />
                </mesh>
            </RigidBody>
        </group>
    )
}
