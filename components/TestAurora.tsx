'use client';

export default function TestAurora() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-8">
      <h1 className="text-4xl mb-8 text-white">Aurora Wave Test</h1>
      
      {/* インラインスタイルでテスト */}
      <div className="mb-8">
        <span 
          className="text-4xl font-bold"
          style={{
            background: 'linear-gradient(90deg, white 0%, white 40%, #00ffff 42%, #ff00ff 44%, #ffff00 46%, #ff00aa 48%, #00ff00 50%, #0099ff 52%, #ff0066 54%, white 56%, white 100%)',
            backgroundSize: '200% 100%',
            backgroundPosition: '100% 0',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'aurora-sweep 8s linear infinite',
          }}
        >
          インラインスタイルテスト
        </span>
      </div>

      {/* クラスを使用したテスト */}
      <div className="mb-8">
        <span className="aurora-wave-text text-4xl font-bold" data-text="クラスを使用したテスト">
          クラスを使用したテスト
        </span>
      </div>

      {/* リバースアニメーション */}
      <div className="mb-8">
        <span className="aurora-wave-text-reverse text-4xl font-bold" data-text="リバースアニメーション">
          リバースアニメーション
        </span>
      </div>

      {/* シンプルなグラデーションテスト */}
      <div className="mb-8">
        <span 
          className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          シンプルグラデーション
        </span>
      </div>
    </div>
  );
}