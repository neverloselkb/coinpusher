/// <reference types="vite/client" />

// 미디어 파일 import 타입 선언
declare module '*.mp3' {
    const src: string
    export default src
}
