import { Button } from "@/components/ui/button";

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
    <div className="flex justify-center mt-6">
      <nav className="inline-flex items-center gap-1 rounded-md shadow-sm" aria-label="Pagination">
        <Button 
          variant="outline"
          size="sm"
          disabled={currentPage === 1 || isLoading}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>
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
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                className="w-8"
                disabled={isLoading}
                onClick={() => onPageChange(page)}
              >
                {page}
              </Button>
            );
          }
          
          // Show ellipsis for gaps
          if (page === 2 && currentPage > 3) {
            return <span key={`ellipsis-${page}`} className="px-2">...</span>;
          }
          
          if (page === totalPages - 1 && currentPage < totalPages - 2) {
            return <span key={`ellipsis-${page}`} className="px-2">...</span>;
          }
          
          return null;
        })}
        <Button 
          variant="outline" 
          size="sm"
          disabled={currentPage === totalPages || isLoading}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </nav>
    </div>
  );
};
