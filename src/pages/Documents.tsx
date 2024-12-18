import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Plus, FileText, Filter } from 'lucide-react';
import { documentsAtom } from '../lib/documents';
import { userAtom } from '../lib/auth';
import DocumentList from '../components/documents/DocumentList';
import CreateDocumentForm from '../components/documents/CreateDocumentForm';
import DocumentFilters from '../components/documents/DocumentFilters';
import DocumentDetails from '../components/documents/DocumentDetails';
import ShareDocumentModal from '../components/documents/ShareDocumentModal';

export default function Documents() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [user] = useAtom(userAtom);
  const [documents] = useAtom(documentsAtom);

  const userDocuments = documents.filter(doc =>
    doc.accessRoles.includes(user?.role || '')
  );

  const canUpload = ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER'].includes(user?.role || '');

  const handleDocumentSelect = (document) => {
    setSelectedDocument(document);
  };

  const handleShare = (data) => {
    // Implement share functionality
    console.log('Share document:', data);
    setShowShareModal(false);
  };

  const handleArchive = () => {
    // Implement archive functionality
    console.log('Archive document:', selectedDocument?.id);
  };

  const handleDelete = () => {
    // Implement delete functionality
    console.log('Delete document:', selectedDocument?.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage and access company documents
          </p>
        </div>
        {canUpload && (
          <button
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Upload Document
          </button>
        )}
      </div>

      {showCreateForm ? (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Upload New Document</h3>
            <button
              onClick={() => setShowCreateForm(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              ×
            </button>
          </div>
          <CreateDocumentForm onSuccess={() => setShowCreateForm(false)} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <DocumentFilters />
          </div>
          <div className="lg:col-span-3">
            <DocumentList 
              documents={userDocuments}
              onDocumentSelect={handleDocumentSelect}
            />
            {selectedDocument && (
              <div className="mt-6">
                <DocumentDetails
                  document={selectedDocument}
                  onShare={() => setShowShareModal(true)}
                  onArchive={handleArchive}
                  onDelete={handleDelete}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {showShareModal && selectedDocument && (
        <ShareDocumentModal
          documentTitle={selectedDocument.title}
          onClose={() => setShowShareModal(false)}
          onShare={handleShare}
        />
      )}
    </div>
  );
}