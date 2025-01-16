import React, { useState } from 'react';
import Filter from '@/components/Filter'; // Adjust the import path accordingly

const App: React.FC = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <div>
            <button
                onClick={() => setIsFilterOpen(true)}
                className="bg-softsec text-white px-4 py-2 rounded-md"
            >
                Buka Filter
            </button>
            {isFilterOpen && (
                <Filter onClose={() => setIsFilterOpen(false)} />
            )}
        </div>
    );
};

export default App;