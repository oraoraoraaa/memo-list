'use client';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LearningConfirm({ open, onClose, onConfirm }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-3">For learning purpose</h3>
        <p className="text-gray-600 mb-6">
          By selecting &quot;For learning purpose&quot;, we will arrange review tasks for you
          automatically.
        </p>
        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium"
        >
          OK
        </button>
      </div>
    </div>
  );
}