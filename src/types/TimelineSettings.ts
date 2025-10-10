export type TimelineEventType =
  | "birthday"
  | "promotion"
  | "marriage"
  | "childbirth"
  | "job-change"
  | "new-product"
  | "all";

export interface TimelineSettings {
  enabledEvents: TimelineEventType[];
}

export const defaultTimelineSettings: TimelineSettings = {
  enabledEvents: [
    "birthday",
    "promotion",
    "marriage",
    "childbirth",
    "job-change",
    "new-product",
  ],
};

export const timelineEventLabels: Record<TimelineEventType, string> = {
  birthday: "誕生日",
  promotion: "昇進（V2以降）",
  marriage: "結婚（V2以降）",
  childbirth: "出産（V2以降）",
  "job-change": "転職（V2以降）",
  "new-product": "新商品発表（V2以降）",
  all: "すべて",
};
