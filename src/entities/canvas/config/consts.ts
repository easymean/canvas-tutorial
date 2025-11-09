// [수정] 캔버스 크기 변수화 (미리보기 크기 조절을 위함)
const CANVAS_WIDTH = 860
const CANVAS_HEIGHT = window.innerHeight * 0.8
const PREVIEW_WIDTH = 150
const PREVIEW_HEIGHT = (PREVIEW_WIDTH * CANVAS_HEIGHT) / CANVAS_WIDTH // 캔버스 비율 유지

export { CANVAS_WIDTH, CANVAS_HEIGHT, PREVIEW_WIDTH, PREVIEW_HEIGHT }
