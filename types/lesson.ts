export type ContentBlockType = 'heading' | 'text' | 'rule' | 'table' | 'example' | 'tip'

export interface TableBlock {
  type: 'table'
  headers: string[]
  rows: string[][]
}

export interface ExampleBlock {
  type: 'example'
  german: string
  turkish: string
}

export interface TextBlock {
  type: 'heading' | 'text' | 'rule' | 'tip'
  body: string
}

export type ContentBlock = TextBlock | TableBlock | ExampleBlock

export interface Exercise {
  question: string
  options: string[]
  answer: number // options index
  explanation?: string
}

export interface LessonContent {
  unitId: string
  lessonIndex: number
  title: string
  blocks: ContentBlock[]
  exercises?: Exercise[]
}
