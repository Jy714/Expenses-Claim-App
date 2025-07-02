import { useState } from "react";
import Input from "../../components/form/input/InputField";
import TextArea from "../../components/form/input/TextArea";
import Select from "../../components/form/Select";
import DatePicker from "../../components/form/date-picker";
import Label from "../../components/form/Label";
import Alert from "../../components/ui/alert/Alert";

interface ExpenseItem {
  category: string;
  amount: number | "";
  description: string;
  expense_date: string;
  receipt: File | null;
}

export default function SubmitExpenseClaim() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<ExpenseItem[]>([
    { category: "", amount: "", description: "", expense_date: "", receipt: null },
  ]);
  const [formError, setFormError] = useState<string>("");
  const [itemErrors, setItemErrors] = useState<string[]>([]);
  const [fileErrors, setFileErrors] = useState<string[]>([]);
  const [formSuccess, setFormSuccess] = useState<string>("");
  const totalAmount = items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  const handleItemChange = <K extends keyof ExpenseItem>(
    idx: number,
    field: K,
    value: ExpenseItem[K]
  ) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
    };
    

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { category: "", amount: "", description: "", expense_date: "", receipt: null },
    ]);
  };

  const removeItem = (idx: number) => {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const validate = () => {
    let error = "";
    const itemErrs: string[] = [];
    const fileErrs: string[] = [];
    if (!title.trim()) error = "Title is required.";
    if (!description.trim()) error = "Description is required.";
    items.forEach((item, idx) => {
      let msg = "";
      let fileMsg = "";
      if (!item.category) msg = "Category required.";
      else if (!item.amount || Number(item.amount) <= 0) msg = "Amount must be greater than 0.";
      else if (!item.expense_date) msg = "Date required.";
      if (item.receipt) {
        const ext = item.receipt.name.split('.').pop()?.toLowerCase();
        if (ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg') {
          fileMsg = "Only PNG and JPG images are accepted.";
        }
      }
      if (msg) itemErrs[idx] = msg; else itemErrs[idx] = "";
      fileErrs[idx] = fileMsg;
    });
    setFormError(error);
    setItemErrors(itemErrs);
    setFileErrors(fileErrs);
    setFormSuccess("");
    return !error && itemErrs.every((e) => !e) && fileErrs.every((e) => !e);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setFormError("");
    setFormSuccess("Your expense claim has been submitted successfully!");
    // TODO: Submit logic here
    // alert("Submitted! (Demo only)");
  };

  const categoryOptions = [
    { value: "Transport", label: "Transport" },
    { value: "Meal", label: "Meal" },
    { value: "Accommodation", label: "Accommodation" },
    { value: "Other", label: "Other" },
  ];

  // Custom FileInput component
  function CustomFileInput({ onChange, value, error }: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, value?: File | null, error?: string }) {
    return (
      <label className={`flex items-center border px-2 py-2 rounded-md bg-white text-gray-900 dark:bg-gray-800 dark:text-white/90 dark:border-gray-600 focus-within:ring-2 focus-within:ring-blue-400 text-xs cursor-pointer transition ${error ? 'border-error-500' : 'border-gray-300'}`}
        style={{ minHeight: '38px', width: '160px', maxWidth: '160px' }}>
        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          className="hidden"
          onChange={onChange}
        />
        <span className={`truncate block w-full ${value ? 'text-gray-900 dark:text-white/90' : 'text-gray-400'}`}
          style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {value ? value.name : 'Upload Files'}
        </span>
      </label>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 dark:text-gray-200 rounded-xl shadow max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Submit Expenses Claim</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="title">Title</Label>
          <Input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className={formError && formError.includes('Title') ? 'border-error-500' : ''}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="description">Description</Label>
          <TextArea
            value={description}
            onChange={val => setDescription(val)}
            rows={2}
            className={formError && formError.includes('Description') ? 'border-error-500' : ''}
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="totalAmount">Total Amount</Label>
          <Input
            value={totalAmount}
            onChange={() => {}}
            className="bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
          />
        </div>
        {formError && (
          <div className="mb-4">
            <Alert variant="error" title="Form Error" message={formError} />
          </div>
        )}
        {formSuccess && (
          <div className="mb-4">
            <Alert variant="success" title="Success" message={formSuccess} />
          </div>
        )}
        <h3 className="text-lg font-semibold mb-2">Expense Items</h3>
        <div className="border rounded mb-4 bg-gray-50 dark:bg-gray-800">
          <table className="w-full text-sm text-left bg-transparent dark:bg-transparent">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="p-3 font-medium">Category</th>
                <th className="p-3 font-medium">Amount</th>
                <th className="p-3 font-medium">Description</th>
                <th className="p-3 font-medium">Date</th>
                <th className="p-3 font-medium">Receipt</th>
                <th className="p-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx} className="transition-colors hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer text-xs">
                  <td className="p-2 align-top">
                    <Select
                      options={categoryOptions}
                      placeholder="Select"
                      className="cursor-pointer"
                      onChange={val => handleItemChange(idx, 'category', val)}
                      defaultValue={item.category}
                    />
                    {itemErrors[idx] && itemErrors[idx].includes('Category') && (
                      <span className="text-error-500 text-xs flex items-center mt-1">
                        <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#F04438" strokeWidth="2"/><path d="M12 8v4m0 4h.01" stroke="#F04438" strokeWidth="2" strokeLinecap="round"/></svg>
                        {itemErrors[idx]}
                      </span>
                    )}
                  </td>
                  <td className="p-2 align-top">
                    <Input
                      type="number"
                      min="0"
                      step={0.01}
                      value={item.amount}
                      onChange={e => handleItemChange(idx, 'amount', e.target.value === '' ? '' : Number(e.target.value))}
                    />
                    {itemErrors[idx] && itemErrors[idx].includes('Amount') && (
                      <span className="text-error-500 text-xs flex items-center mt-1">
                        <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#F04438" strokeWidth="2"/><path d="M12 8v4m0 4h.01" stroke="#F04438" strokeWidth="2" strokeLinecap="round"/></svg>
                        {itemErrors[idx]}
                      </span>
                    )}
                  </td>
                  <td className="p-2 align-top">
                    <Input
                      value={item.description}
                      onChange={e => handleItemChange(idx, 'description', e.target.value)}
                    />
                  </td>
                  <td className="p-2 align-top">
                    <DatePicker
                      id={`expense-date-${idx}`}
                      defaultDate={item.expense_date || undefined}
                      onChange={(dates: Date[]) => handleItemChange(idx, 'expense_date', dates[0] ? dates[0].toISOString().slice(0, 10) : '')}
                      placeholder="Select Date"
                      iconSize="size-4"
                    />
                    {itemErrors[idx] && itemErrors[idx].includes('Date') && (
                      <span className="text-error-500 text-xs flex items-center mt-1">
                        <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#F04438" strokeWidth="2"/><path d="M12 8v4m0 4h.01" stroke="#F04438" strokeWidth="2" strokeLinecap="round"/></svg>
                        {itemErrors[idx]}
                      </span>
                    )}
                  </td>
                  <td className="p-2 align-center w-40">
                    <CustomFileInput
                      onChange={e => handleItemChange(idx, 'receipt', e.target.files ? e.target.files[0] : null)}
                      value={item.receipt}
                      error={fileErrors[idx]}
                    />
                    {fileErrors[idx] && (
                      <span className="text-error-500 text-xs flex items-center mt-1">{fileErrors[idx]}</span>
                    )}
                  </td>
                  <td className="p-2 align-center text-center">
                    <button
                      type="button"
                      className="text-red-600 text-sm flex items-center cursor-pointer"
                      onClick={() => removeItem(idx)}
                      disabled={items.length === 1}
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" stroke="#F04438" strokeWidth="2" strokeLinecap="round"/></svg>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
          onClick={addItem}
        >
          + Add Expense Item
        </button>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Submit Claim
          </button>
        </div>
      </form>
    </div>
  );
}
