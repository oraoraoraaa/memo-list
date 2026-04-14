'use client';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirm({ open, onClose, onConfirm }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">⚠️</span>
          <h3 className="text-lg font-semibold">You are deleting your task!</h3>
        </div>
        <p className="text-gray-600 mb-6">
          Your task and relevant progress will lose forever!
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 border rounded-lg font-medium"
          >
            Maybe later
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 py-3 bg-red-600 text-white rounded-lg font-medium"
          >
            Delete now
          </button>
        </div>
      </div>
    </div>
  );
}