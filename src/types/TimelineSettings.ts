export type TimelineEventType =
  | 'birthday'
  | 'promotion'
  | 'marriage'
  | 'childbirth'
  | 'job-change'
  | 'new-product'
  | 'all';

export interface TimelineSettings {
  enabledEvents: TimelineEventType[];
}

export const defaultTimelineSettings: TimelineSettings = {
  enabledEvents: ['birthday', 'promotion', 'marriage', 'childbirth', 'job-change', 'new-product'],
};

export const timelineEventLabels: Record<TimelineEventType, string> = {
  'birthday': '誕生日',
  'promotion': '昇進',
  'marriage': '結婚',
  'childbirth': '出産',
  'job-change': '転職',
  'new-product': '新商品発表',
  'all': 'すべて',
};
