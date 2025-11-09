import { PREVIEW_WIDTH, PREVIEW_HEIGHT } from '@/entities/canvas'

export const PreviewImage = ({ previewImage }: { previewImage: string }) => {
  return (
    <div
      style={{
        width: `${PREVIEW_WIDTH}px`,
        height: `${PREVIEW_HEIGHT}px`,
        border: '1px solid #007bff', // 파란색 테두리
        backgroundColor: '#f8f9fa', // 연한 배경색
      }}
    >
      {previewImage && (
        <img
          src={previewImage}
          alt="Canvas Preview"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain', // 캔버스 비율 유지
          }}
        />
      )}
    </div>
  )
}
