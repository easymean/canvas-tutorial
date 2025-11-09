import { PREVIEW_WIDTH, PREVIEW_HEIGHT } from '@/entities/canvas'

export const PreviewImage = ({ src, onClick }: { src?: string; onClick: () => void }) => {
  return (
    <div
      style={{
        width: `${PREVIEW_WIDTH}px`,
        height: `${PREVIEW_HEIGHT}px`,
        border: '1px solid #007bff', // 파란색 테두리
        backgroundColor: '#f8f9fa', // 연한 배경색
      }}
      onClick={onClick}
    >
      {src && (
        <img
          src={src}
          alt="Canvas Preview"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain', // 캔버스 비율 유지
          }}
        />
      )}
      {!src && (
        <div className="flex items-center justify-center">
          <p>No image</p>
        </div>
      )}
    </div>
  )
}
