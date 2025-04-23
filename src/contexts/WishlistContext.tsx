import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string; // Adding description as optional property
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (itemId: string) => void;
  isInWishlist: (itemId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  
  useEffect(() => {
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('ecomm-wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ecomm-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlist(currentWishlist => {
      if (!currentWishlist.some(i => i.id === item.id)) {
        toast.success(`${item.name} added to wishlist`);
        return [...currentWishlist, item];
      }
      return currentWishlist;
    });
  };

  const removeFromWishlist = (itemId: string) => {
    setWishlist(currentWishlist => {
      const itemToRemove = currentWishlist.find(item => item.id === itemId);
      if (itemToRemove) {
        toast.success(`${itemToRemove.name} removed from wishlist`);
      }
      return currentWishlist.filter(item => item.id !== itemId);
    });
  };

  const isInWishlist = (itemId: string) => {
    return wishlist.some(item => item.id === itemId);
  };

  const clearWishlist = () => {
    setWishlist([]);
    toast.success('Wishlist cleared');
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
