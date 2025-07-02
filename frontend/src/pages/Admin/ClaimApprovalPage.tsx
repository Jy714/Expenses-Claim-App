import React, { useState, useEffect } from "react";
import ClaimListTable from "../../components/claims/ClaimListTable";
import ClaimDetailDrawer from "../../components/claims/ClaimDetailDrawer.tsx";
import { mockClaims, mockClaimDetail } from "../../components/claims/mockClaims";

export default function ClaimApprovalPage() {
  const [claims, setClaims] = useState(mockClaims);
  const [selectedClaim, setSelectedClaim] = useState(null);

  useEffect(() => {
    // TODO: Fetch pending claims from backend (status: pending, manager_approval_status: 1)
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Expense Claims</h2>
      <ClaimListTable
        claims={claims}
        onSelectClaim={() => setSelectedClaim(mockClaimDetail)}
      />
      {selectedClaim && (
        <ClaimDetailDrawer
          claim={selectedClaim}
          onClose={() => setSelectedClaim(null)}
          onAction={() => {}}
        />
      )}
    </div>
  );
}
