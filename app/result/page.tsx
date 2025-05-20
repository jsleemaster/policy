"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Share2 } from "lucide-react"

export default function ResultPage() {
  const searchParams = useSearchParams()
  const egenScore = Number.parseInt(searchParams.get("egen") || "0")
  const tetoScore = Number.parseInt(searchParams.get("teto") || "0")

  const totalQuestions = egenScore + tetoScore
  const egenPercentage = Math.round((egenScore / totalQuestions) * 100)
  const tetoPercentage = Math.round((tetoScore / totalQuestions) * 100)

  const primaryType = egenScore > tetoScore ? "에겐" : "테토"
  const secondaryType = egenScore > tetoScore ? "테토" : "에겐"

  const resultDescriptions = {
    에겐: {
      title: "에너지 겁나 넘치는 유형",
      description:
        "당신은 활발하고 에너지가 넘치는 성격의 소유자입니다. 사교적이고 외향적인 성향으로 모임에서 분위기를 주도하는 경향이 있습니다. 새로운 사람들과 쉽게 어울리고, 다양한 활동에 참여하는 것을 즐깁니다. 감정 표현이 풍부하고 즉흥적인 결정을 내리는 경우가 많습니다.",
      strengths: ["사교성이 좋음", "적응력이 뛰어남", "에너지가 넘침", "분위기 메이커"],
      weaknesses: ["깊이 있는 관계 형성이 어려울 수 있음", "계획성이 부족할 수 있음"],
    },
    테토: {
      title: "테스토스테론이 넘치는 유형",
      description:
        "당신은 차분하고 신중한 성격의 소유자입니다. 논리적이고 분석적인 사고를 바탕으로 결정을 내리는 경향이 있습니다. 깊이 있는 대화와 관계를 선호하며, 계획적으로 일을 처리하는 것을 좋아합니다. 감정보다는 이성을 중시하고, 한 가지 일에 집중하는 능력이 뛰어납니다.",
      strengths: ["논리적 사고력", "신중함", "깊이 있는 관계 형성", "집중력이 좋음"],
      weaknesses: ["새로운 환경 적응에 시간이 걸림", "감정 표현이 부족할 수 있음"],
    },
  }

  const result = resultDescriptions[primaryType as keyof typeof resultDescriptions]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-100 to-blue-100 p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">당신의 결과는</h1>
            <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
              {primaryType}
              {egenScore > tetoScore ? "녀" : "남"} {egenPercentage}%
            </h2>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">에겐</span>
                <span>{egenPercentage}%</span>
              </div>
              <Progress value={egenPercentage} className="h-2 bg-gray-200" indicatorClassName="bg-pink-500" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-medium">테토</span>
                <span>{tetoPercentage}%</span>
              </div>
              <Progress value={tetoPercentage} className="h-2 bg-gray-200" indicatorClassName="bg-blue-500" />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-bold text-lg mb-2">{result.title}</h3>
            <p className="text-gray-700 mb-4">{result.description}</p>

            <div className="mb-3">
              <h4 className="font-semibold text-green-600 mb-1">강점</h4>
              <ul className="list-disc pl-5 text-sm">
                {result.strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-red-600 mb-1">약점</h4>
              <ul className="list-disc pl-5 text-sm">
                {result.weaknesses.map((weakness, index) => (
                  <li key={index}>{weakness}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600">
              <Share2 className="mr-2 h-4 w-4" /> 결과 공유하기
            </Button>
            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full">
                다시 테스트하기
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
