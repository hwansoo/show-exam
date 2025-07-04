import { ProblemSet } from '@/types'

interface ExamSelectorProps {
  examSets: ProblemSet[]
  onSelectExam: (exam: ProblemSet) => void
}

export default function ExamSelector({ examSets, onSelectExam }: ExamSelectorProps) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">문제 세트 선택</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {examSets.map((examSet) => (
          <button
            key={examSet.id}
            onClick={() => onSelectExam(examSet)}
            className="bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 
                     border border-gray-200 rounded-xl p-6 text-left transition-all duration-300 
                     hover:shadow-lg hover:-translate-y-1 group"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600">
              {examSet.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {examSet.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-blue-600 font-medium">
                {examSet.problems?.length || 0}문제
              </span>
              <span className="text-green-600 font-medium">
                {examSet.totalScore || 0}점
              </span>
            </div>
          </button>
        ))}
      </div>
      
      {examSets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">문제 세트를 불러오는 중...</p>
        </div>
      )}
    </div>
  )
}