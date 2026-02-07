import React from 'react';
import { SchoolInfo } from '../types';
import { X, Building2, MapPin } from 'lucide-react';

interface SchoolSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  schools: SchoolInfo[];
  onSelect: (school: SchoolInfo) => void;
}

const SchoolSelectModal: React.FC<SchoolSelectModalProps> = ({ 
  isOpen, 
  onClose, 
  schools, 
  onSelect 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        {/* Background Overlay */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Modal Panel */}
        <div className="relative inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
              <h3 className="text-lg leading-6 font-bold text-gray-900" id="modal-title">
                학교를 선택해주세요
              </h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-2 max-h-96 overflow-y-auto">
              <ul className="divide-y divide-gray-100">
                {schools.map((school) => (
                  <li 
                    key={school.SD_SCHUL_CODE} 
                    className="py-3 px-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group"
                    onClick={() => onSelect(school)}
                  >
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-indigo-50 rounded-full text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                            <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">{school.SCHUL_NM}</p>
                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {school.ORG_RDNMA}
                            </p>
                        </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolSelectModal;
