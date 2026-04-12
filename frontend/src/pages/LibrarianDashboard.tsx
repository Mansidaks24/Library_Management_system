import { useState, useEffect } from 'react';
import api from '../api';
import type { Book, Branch } from '../types';
import toast from 'react-hot-toast';
import { 
  BookPlus, 
  Building, 
  PackagePlus, 
  BarChart3, 
  TrendingUp, 
  AlertTriangle
} from 'lucide-react';

interface PopularBook {
  title: string;
  author: string;
  borrow_count: number;
  rank: number;
}

interface BranchInventory {
  branch: string;
  title: string;
  total: number;
  available: number;
}

export default function LibrarianDashboard() {
  const [activeTab, setActiveTab] = useState<'books' | 'branches' | 'inventory' | 'reports'>('books');
  const [books, setBooks] = useState<Book[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [branchTotals, setBranchTotals] = useState<{branch: string, total_stock: number}[]>([]);
  const [monthlyFineRevenue, setMonthlyFineRevenue] = useState<number>(0);
  const [totalFineRevenue, setTotalFineRevenue] = useState<number>(0);
  const [branchRevenue, setBranchRevenue] = useState<{branch: string, revenue: number}[]>([]);
  
  const [popularBooks, setPopularBooks] = useState<PopularBook[]>([]);
  const [inventoryReport, setInventoryReport] = useState<BranchInventory[]>([]);
  const [loadingReports, setLoadingReports] = useState(false);

  const [bookForm, setBookForm] = useState({ title: '', author: '', category: '', description: '' });
  const [branchForm, setBranchForm] = useState({ location: '' });
  const [inventoryForm, setInventoryForm] = useState({ branch_id: '', book_id: '', total_copies: 1 });

  useEffect(() => {
    fetchBaseData();
  }, []);

  useEffect(() => {
    if (activeTab === 'reports') {
      fetchReports();
    }
  }, [activeTab]);

  const fetchBaseData = async () => {
    try {
      const [booksRes, branchesRes] = await Promise.all([
        api.get('/books'),
        api.get('/branches')
      ]);
      setBooks(booksRes.data);
      setBranches(branchesRes.data);
    } catch (error) {
      console.error('Error fetching base data:', error);
      toast.error('Failed to load system data.');
    }
  };

  const fetchReports = async () => {
    setLoadingReports(true);
    try {
      const [popRes, invRes, totalRes, monthlyRes, totalFineRes, branchRevRes] = await Promise.all([
        api.get('/reports/popular-books'),
        api.get('/reports/branch-inventory'),
        api.get('/reports/total-books-per-branch'),
        api.get('/reports/monthly-fines'),
        api.get('/reports/total-fines'),
        api.get('/reports/branch-revenue')
      ]);
      setPopularBooks(popRes.data);
      setInventoryReport(invRes.data);
      setBranchTotals(totalRes.data);
      setMonthlyFineRevenue(monthlyRes.data.monthly_fine_revenue || 0);
      setTotalFineRevenue(totalFineRes.data.total_revenue || 0);
      setBranchRevenue(branchRevRes.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast.error('Could not load analytics reports.');
    } finally {
      setLoadingReports(false);
    }
  };

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/books', bookForm);
      toast.success('Book added to global catalog!');
      setBookForm({ title: '', author: '', category: '', description: '' });
      fetchBaseData();
    } catch (error) { 
      toast.error('Failed to add book.'); 
    }
  };

  const handleAddBranch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/branches', branchForm);
      toast.success('New branch opened!');
      setBranchForm({ location: '' });
      fetchBaseData();
    } catch (error) { 
      toast.error('Failed to add branch.'); 
    }
  };

  const handleUpdateInventory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/inventory', {
        branch_id: parseInt(inventoryForm.branch_id),
        book_id: parseInt(inventoryForm.book_id),
        total_copies: inventoryForm.total_copies
      });
      toast.success('Inventory updated successfully!');
      setInventoryForm({ branch_id: '', book_id: '', total_copies: 1 });
    } catch (error) { 
      toast.error('Failed to update inventory.'); 
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Management Portal</h1>
        <p className="text-gray-500">Manage catalog, branches, and view system analytics.</p>
      </div>

      <div className="flex gap-2 mb-6">
        <button 
          onClick={() => setActiveTab('books')}
          className={`px-4 py-2 rounded ${activeTab === 'books' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Books ({books.length})
        </button>
        <button 
          onClick={() => setActiveTab('branches')}
          className={`px-4 py-2 rounded ${activeTab === 'branches' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Branches ({branches.length})
        </button>
        <button 
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2 rounded ${activeTab === 'inventory' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Inventory
        </button>
        <button 
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded ${activeTab === 'reports' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Analytics
        </button>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 min-h-96">
        {activeTab === 'books' && (
          <form onSubmit={handleAddBook} className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Add New Book to Catalog</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" required placeholder="Book Title" className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={bookForm.title} onChange={e => setBookForm({...bookForm, title: e.target.value})} />
              <input type="text" required placeholder="Author Name" className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={bookForm.author} onChange={e => setBookForm({...bookForm, author: e.target.value})} />
              <input type="text" required placeholder="Category" className="md:col-span-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={bookForm.category} onChange={e => setBookForm({...bookForm, category: e.target.value})} />
              <textarea rows={4} required placeholder="Description" className="md:col-span-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={bookForm.description} onChange={e => setBookForm({...bookForm, description: e.target.value})} />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">Register Book</button>
          </form>
        )}

        {activeTab === 'branches' && (
          <form onSubmit={handleAddBranch} className="space-y-6 max-w-md">
            <h2 className="text-xl font-bold text-gray-800">Open New Branch</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location Name</label>
              <input type="text" required placeholder="e.g. Main Street Branch" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={branchForm.location} onChange={e => setBranchForm({ location: e.target.value })} />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">Add Branch</button>
          </form>
        )}

        {activeTab === 'inventory' && (
          <form onSubmit={handleUpdateInventory} className="space-y-6 max-w-lg">
            <h2 className="text-xl font-bold text-gray-800">Allocate Stock</h2>
            <div className="space-y-4">
              <select required className="w-full p-3 border rounded-lg bg-white" value={inventoryForm.branch_id} onChange={e => setInventoryForm({...inventoryForm, branch_id: e.target.value})}>
                <option value="">Select Branch</option>
                {branches.map(b => <option key={b.id} value={b.id}>{b.location}</option>)}
              </select>
              <select required className="w-full p-3 border rounded-lg bg-white" value={inventoryForm.book_id} onChange={e => setInventoryForm({...inventoryForm, book_id: e.target.value})}>
                <option value="">Select Book</option>
                {books.map(b => <option key={b.id} value={b.id}>{b.title}</option>)}
              </select>
              <input type="number" min="1" required placeholder="Total Copies" className="w-full p-3 border rounded-lg" value={inventoryForm.total_copies} onChange={e => setInventoryForm({...inventoryForm, total_copies: parseInt(e.target.value)})} />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">Update Branch Stock</button>
          </form>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-10">
            {loadingReports ? (
              <p className="text-center text-gray-500">Loading reports...</p>
            ) : (
              <>
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <TrendingUp className="text-blue-600 w-5 h-5" />
                    <h2 className="text-xl font-bold text-gray-800">Book Popularity</h2>
                  </div>
                  <div className="space-y-2">
                    {popularBooks.length > 0 ? (
                      popularBooks.map((item, idx) => (
                        <div key={idx} className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                          <div className="font-bold text-gray-900">#{item.rank}: {item.title}</div>
                          <div className="text-sm text-gray-600">{item.borrow_count} borrows</div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No data available</p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <AlertTriangle className="text-orange-500 w-5 h-5" />
                    <h2 className="text-xl font-bold text-gray-800">Branch Stock</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {inventoryReport.length > 0 ? (
                      inventoryReport.map((item, idx) => (
                        <div key={idx} className="p-4 rounded-xl border bg-white">
                          <p className="text-xs font-bold text-gray-400 uppercase">{item.branch}</p>
                          <h4 className="font-bold text-gray-900">{item.title}</h4>
                          <span className="text-sm text-gray-600">{item.available} / {item.total} available</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No inventory data</p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <TrendingUp className="text-blue-600 w-5 h-5" />
                    <h2 className="text-xl font-bold text-gray-800">Fine Revenue</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 border border-blue-100 p-6 rounded-lg">
                      <p className="text-sm text-blue-500 uppercase">This Month</p>
                      <p className="mt-2 text-2xl font-bold text-blue-900">₹{monthlyFineRevenue.toLocaleString()}</p>
                    </div>
                    <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-lg">
                      <p className="text-sm text-indigo-500 uppercase">Total Revenue</p>
                      <p className="mt-2 text-2xl font-bold text-indigo-900">₹{totalFineRevenue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
