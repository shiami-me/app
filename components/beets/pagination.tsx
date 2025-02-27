import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}) => {
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex justify-center mt-8">
      <nav className="flex items-center gap-1 rounded-lg bg-card shadow-sm border border-gray-200 dark:border-gray-700 p-1" aria-label="Pagination">
        <Button 
          variant="ghost"
          size="icon"
          disabled={currentPage === 1 || isLoading}
          onClick={() => onPageChange(currentPage - 1)}
          className="rounded-lg"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous Page</span>
        </Button>
        
        <div className="flex items-center">
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            // Show first, last, current, and pages around current
            if (
              page === 1 || 
              page === totalPages || 
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <Button 
                  key={page}
                  variant={currentPage === page ? "default" : "ghost"}
                  size="sm"
                  className={`w-9 h-9 ${currentPage === page ? "bg-green-600 text-white hover:bg-green-700" : ""}`}
                  disabled={isLoading}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </Button>
              );
            }
            
            // Show ellipsis for gaps
            if ((page === 2 && currentPage > 3) || (page === totalPages - 1 && currentPage < totalPages - 2)) {
              return <span key={`ellipsis-${page}`} className="px-2 text-gray-400">...</span>;
            }
            
            return null;
          })}
        </div>
        
        <Button 
          variant="ghost" 
          size="icon"
          disabled={currentPage === totalPages || isLoading}
          onClick={() => onPageChange(currentPage + 1)}
          className="rounded-lg"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next Page</span>
        </Button>
      </nav>
    </div>
  );
};
