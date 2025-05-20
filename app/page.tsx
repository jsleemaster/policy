import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-100 to-blue-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center mb-6">에겐/테토 성격 유형 테스트</h1>
          <div className="space-y-4 mb-8">
            <div className="bg-pink-50 p-4 rounded-lg">
              <h2 className="font-bold text-pink-600">에겐남/에겐녀</h2>
              <p className="text-sm text-gray-700">에너지 겁나 넘치는 남자/여자</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="font-bold text-blue-600">테토남/테토녀</h2>
              <p className="text-sm text-gray-700">테스토스테론이 넘치는 남자/여자</p>
            </div>
          </div>
          <p className="text-gray-600 mb-8 text-center">간단한 질문에 답하고 당신의 성격 유형을 알아보세요!</p>
          <div className="flex justify-center">
            <Link href="/test">
              <Button className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white px-8 py-2 rounded-full">
                테스트 시작하기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
