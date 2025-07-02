import React from "react";

export default function ClaimListTable({ claims, onSelectClaim }: { claims: any[]; onSelectClaim: (claim: any) => void }) {
  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead>
        <tr>
          <th className="px-4 py-2">Claim ID</th>
          <th className="px-4 py-2">User</th>
          <th className="px-4 py-2">Title</th>
          <th className="px-4 py-2">Total Amount</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {claims.length === 0 ? (
          <tr>
            <td colSpan={6} className="text-center py-4 text-gray-500 dark:text-gray-400">No claims found.</td>
          </tr>
        ) : (
          claims.map((claim) => (
            <tr key={claim.claim_id} className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
              <td className="px-4 py-2">{claim.claim_id}</td>
              <td className="px-4 py-2">{claim.user_name || claim.user_id}</td>
              <td className="px-4 py-2">{claim.title}</td>
              <td className="px-4 py-2">${claim.total_amount?.toFixed(2)}</td>
              <td className="px-4 py-2">{claim.status_text || "Pending"}</td>
              <td className="px-4 py-2">
                <button
                  className="px-3 py-1 rounded bg-blue-600 text-white dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600"
                  onClick={() => onSelectClaim(claim)}
                >
                  View
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
