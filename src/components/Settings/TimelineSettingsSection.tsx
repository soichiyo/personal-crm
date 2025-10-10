import { TimelineSettings, TimelineEventType, timelineEventLabels } from "../../types/TimelineSettings";

interface TimelineSettingsSectionProps {
  settings: TimelineSettings;
  onSettingsChange: (settings: TimelineSettings) => void;
}

export const TimelineSettingsSection = ({
  settings,
  onSettingsChange,
}: TimelineSettingsSectionProps) => {
  const eventTypes: TimelineEventType[] = [
    'birthday',
    'promotion',
    'marriage',
    'childbirth',
    'job-change',
    'new-product',
  ];

  const toggleEvent = (eventType: TimelineEventType) => {
    const isEnabled = settings.enabledEvents.includes(eventType);

    if (isEnabled) {
      // イベントを無効化
      onSettingsChange({
        ...settings,
        enabledEvents: settings.enabledEvents.filter(e => e !== eventType),
      });
    } else {
      // イベントを有効化
      onSettingsChange({
        ...settings,
        enabledEvents: [...settings.enabledEvents, eventType],
      });
    }
  };

  const toggleAll = () => {
    const allEnabled = eventTypes.every(type => settings.enabledEvents.includes(type));

    if (allEnabled) {
      // すべて無効化
      onSettingsChange({
        ...settings,
        enabledEvents: [],
      });
    } else {
      // すべて有効化
      onSettingsChange({
        ...settings,
        enabledEvents: [...eventTypes],
      });
    }
  };

  const allEnabled = eventTypes.every(type => settings.enabledEvents.includes(type));

  return (
    <div className="bg-white rounded-2xl shadow-sm mb-4">
      <h3 className="text-sm font-semibold text-gray-700 p-4 border-b">
        タイムライン表示設定
      </h3>

      {/* すべて選択/解除 */}
      <div className="p-4 border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <p className="font-medium text-gray-800">{timelineEventLabels.all}</p>
          <button
            onClick={toggleAll}
            className={`w-12 h-6 rounded-full relative transition-colors ${
              allEnabled ? 'bg-gray-900' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={allEnabled ? 'すべて無効化' : 'すべて有効化'}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                allEnabled ? 'right-1' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* 個別イベント設定 */}
      {eventTypes.map((eventType, index) => {
        const isEnabled = settings.enabledEvents.includes(eventType);
        const isLast = index === eventTypes.length - 1;

        return (
          <div
            key={eventType}
            className={`p-4 ${!isLast ? 'border-b' : ''}`}
          >
            <div className="flex items-center justify-between">
              <p className="font-medium text-gray-800">
                {timelineEventLabels[eventType]}
              </p>
              <button
                onClick={() => toggleEvent(eventType)}
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  isEnabled ? 'bg-gray-900' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`${timelineEventLabels[eventType]}を${isEnabled ? '無効化' : '有効化'}`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                    isEnabled ? 'right-1' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
