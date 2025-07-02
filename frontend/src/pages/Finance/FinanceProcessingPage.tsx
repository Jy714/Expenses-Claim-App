import React, { useState, useEffect } from "react";
import ClaimListTable from "../../components/claims/ClaimListTable";
import ClaimDetailDrawer from "../../components/claims/ClaimDetailDrawer.tsx";
import { mockClaims, mockClaimDetail } from "../../components/claims/mockClaims";

export default function FinanceProcessingPage() {
  const [claims, setClaims] = useState(mockClaims);
  const [selectedClaim, setSelectedClaim] = useState(null);

  useEffect(() => {
    // TODO: Fetch claims approved by manager, pending finance (manager_approval_status: 2, finance_approval_status: 1)
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Finance Processing</h2>
      <ClaimListTable claims={claims} onSelectClaim={() => setSelectedClaim(mockClaimDetail)} />
      {selectedClaim && (
        <ClaimDetailDrawer
          claim={selectedClaim}
          onClose={() => setSelectedClaim(null)}
          onAction={() => {}}
          financeMode
        />
      )}
    </div>
  );
}
