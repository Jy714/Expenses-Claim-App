import React from "react";

export default function ClaimDetailDrawer({ claim, onClose, onAction, financeMode }: { claim: any; onClose: () => void; onAction: (action: string, comment?: string) => void; financeMode?: boolean }) {
  if (!claim) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200" onClick={onClose}>&times;</button>
        <h3 className="text-xl font-bold mb-2">Claim #{claim.claim_id}</h3>
        <div className="mb-4">
          <div><b>User:</b> {claim.user_name || claim.user_id}</div>
          <div><b>Title:</b> {claim.title}</div>
          <div><b>Description:</b> {claim.description}</div>
          <div><b>Total Amount:</b> ${claim.total_amount?.toFixed(2)}</div>
          <div><b>Status:</b> {claim.status_text || "Pending"}</div>
        </div>
        {/* TODO: Add expense items, receipts, approval/finance history, comment box, and action buttons */}
        <div className="flex gap-2 mt-6">
          {!financeMode ? (
            <>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" onClick={() => onAction("approve")}>Approve</button>
              <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={() => onAction("reject")}>Reject</button>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600" onClick={() => onAction("query")}>Query</button>
            </>
          ) : (
            <>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" onClick={() => onAction("processed")}>Mark as Processed</button>
              <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={() => onAction("finance_reject")}>Reject</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
