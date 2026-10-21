import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import {
  MapPin,
  Users,
  Calendar,
  Star,
  Search,
  SlidersHorizontal,
  X,
  Grid3X3,
  List,
  RotateCcw,
  Compass,
  ArrowRight,
  Heart,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowUpDown,
  Filter,
} from 'lucide-react';
import type { ITourresponse } from '@/Alltypes/tour.type';
import { useGetAlltourQuery } from '@/redux/features/tour/tour.api';
import { useGetTourtypeQuery } from '@/redux/features/tour/tourType.api';
import { useGetDivisionsQuery } from '@/redux/features/Division/division.api';
import { useGetMyWishlistQuery, useToggleWishlistMutation } from '@/redux/features/wishlist/wishlist.api';
import { useUserInfoQuery } from '@/redux/features/auth/auth.api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import toursBanner from '@/assets/BannerImage/Tours-Banner.jpg';
import { getTourFallbackImage, handleTourImageError } from '@/lib/tourImages';
import { toast } from 'sonner';

// Quick budget filter presets
const BUDGET_PRESETS = [
  { label: 'All Budgets', min: '', max: '' },
  { label: 'Under ৳5,000', min: '', max: '5000' },
  { label: '৳5,000 - ৳10,000', min: '5000', max: '10000' },
  { label: '৳10,000 - ৳20,000', min: '10000', max: '20000' },
  { label: '৳20,000+', min: '20000', max: '' },
];

const Tours = () => {
  // Filter States
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [tempSearchInput, setTempSearchInput] = useState<string>('');
  const [selectedDivision, setSelectedDivision] = useState<string>('');
  const [selectedTourType, setSelectedTourType] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Queries
  const { data: userData } = useUserInfoQuery(undefined);
  const { data: wishlistData, refetch: refetchWishlist } = useGetMyWishlistQuery(undefined, {
    skip: !userData?.data,
  });
  const [toggleWishlist] = useToggleWishlistMutation();

  const queryParams = {
    division: selectedDivision || undefined,
    tourType: selectedTourType || undefined,
    searchTerm: searchTerm || undefined,
    sort:
      sortBy === 'price-asc'
        ? 'costFrom'
        : sortBy === 'price-desc'
        ? '-costFrom'
        : sortBy === 'newest'
        ? '-createdAt'
        : undefined,
    minPrice: minPrice || undefined,
    maxPrice: maxPrice || undefined,
    page: currentPage,
    limit: 9,
  };

  const { data: toursData, isLoading: tourLoading } = useGetAlltourQuery(queryParams);
  const { data: tourTypeData, isLoading: tourTypeLoading } = useGetTourtypeQuery(undefined);
  const { data: divisionData, isLoading: divisionLoading } = useGetDivisionsQuery(undefined);

  const rawTours = toursData?.data?.data ?? [];
  const totalPages = toursData?.data?.meta?.totalPage || 1;
  const totalTours = toursData?.data?.meta?.total || rawTours.length;

  const tourTypes = tourTypeData?.data?.data ?? [];
  const divisions = divisionData?.data?.data ?? [];

  // Create lookup maps for fast name retrieval
  const tourTypeMap = useMemo(() => {
    const map = new Map<string, string>();
    tourTypes.forEach((t: { _id: string; name: string }) => map.set(t._id, t.name));
    return map;
  }, [tourTypes]);

  const divisionMap = useMemo(() => {
    const map = new Map<string, string>();
    divisions.forEach((d: { _id: string; name: string }) => map.set(d._id, d.name));
    return map;
  }, [divisions]);

  // Wishlisted tour IDs set
  const wishlistedIds = useMemo(() => {
    const set = new Set<string>();
    wishlistData?.data?.forEach((item: any) => {
      const tourId = item.tour?._id || item.tour;
      if (tourId) set.add(tourId);
    });
    return set;
  }, [wishlistData]);

  // Client-side fallback sorting if needed
  const tours = useMemo(() => {
    const list = [...rawTours];
    if (sortBy === 'price-asc') {
      list.sort((a, b) => (a.costFrom || 0) - (b.costFrom || 0));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => (b.costFrom || 0) - (a.costFrom || 0));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.costFrom || 0) - (a.costFrom || 0));
    }
    return list;
  }, [rawTours, sortBy]);

  // Active filters count
  const activeFiltersCount = [
    selectedDivision,
    selectedTourType,
    searchTerm,
    minPrice,
    maxPrice,
  ].filter(Boolean).length;

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedDivision('');
    setSelectedTourType('');
    setSearchTerm('');
    setTempSearchInput('');
    setMinPrice('');
    setMaxPrice('');
    setCurrentPage(1);
  };

  // Handle Hero Search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(tempSearchInput.trim());
    setCurrentPage(1);
  };

  // Wishlist toggle handler
  const handleToggleWishlist = async (e: React.MouseEvent, tourId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userData?.data) {
      toast.error('Please log in to save tours to your wishlist');
      return;
    }

    try {
      const res = await toggleWishlist(tourId).unwrap();
      if (res?.success) {
        const isNowSaved = !wishlistedIds.has(tourId);
        toast.success(isNowSaved ? 'Saved to wishlist!' : 'Removed from wishlist');
        refetchWishlist();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update wishlist');
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16 font-sans">
      {/* =========================================================================
          HERO BANNER SECTION
         ========================================================================= */}
      <section className="relative px-3 sm:px-6 lg:px-8 pt-4 pb-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 min-h-[380px] sm:min-h-[440px] md:min-h-[480px] flex flex-col justify-between p-6 sm:p-10 md:p-14 text-white">
          {/* Background Image with Cinematic Backdrop */}
          <div className="absolute inset-0 z-0">
            <img
              src={toursBanner}
              alt="Explore Tours with WanderGo"
              className="w-full h-full object-cover scale-105 filter brightness-90 animate-fade-in"
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1800&q=80';
              }}
            />
            {/* Multi-stage ambient gradients for maximum depth & readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/35" />
            <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/20 to-black/80" />
          </div>

          {/* Top Breadcrumb & Trust Pill */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-white/95">
              <Sparkles className="size-3.5 text-[#EF1A53]" />
              <span>Curated Travel Experiences</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-white/80">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-emerald-400" /> 100% Verified Tours
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="size-4 text-amber-400 fill-amber-400" /> 4.9/5 Rating
              </span>
            </div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 my-auto py-6 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-nunito leading-tight text-white drop-shadow-md">
              Discover Extraordinary <br />
              <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
                Adventures in Bangladesh
              </span>
            </h1>
            <p className="mt-3 text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-2xl font-normal drop-shadow-sm">
              From majestic cloud-kissed hills in Sajek to serene tea gardens in Sylhet and pristine
              coastal shores—find handpicked tours crafted for unforgettable memories.
            </p>
          </div>

          {/* Interactive Hero Search Bar */}
          <div className="relative z-10 w-full max-w-4xl mx-auto">
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white/95 dark:bg-card/95 backdrop-blur-xl p-2 sm:p-2.5 rounded-2xl sm:rounded-full shadow-2xl border border-white/40 dark:border-border/60 flex flex-col sm:flex-row items-center gap-2"
            >
              <div className="relative flex-1 w-full flex items-center pl-3">
                <Search className="size-5 text-[#EF1A53] shrink-0 mr-2.5" />
                <Input
                  type="text"
                  placeholder="Search destination, tour title, or adventure..."
                  value={tempSearchInput}
                  onChange={(e) => setTempSearchInput(e.target.value)}
                  className="border-0 bg-transparent shadow-none focus-visible:ring-0 text-foreground placeholder:text-muted-foreground text-sm h-11 px-0"
                />
                {tempSearchInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setTempSearchInput('');
                      setSearchTerm('');
                    }}
                    className="p-1.5 text-muted-foreground hover:text-foreground transition-colors mr-2"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </div>

              {/* Division Quick Selector in Searchbar */}
              <div className="w-full sm:w-52 sm:border-l border-border/60 sm:pl-2">
                <Select
                  value={selectedDivision}
                  onValueChange={(val) => {
                    setSelectedDivision(val === 'all' ? '' : val);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="border-0 bg-transparent shadow-none focus:ring-0 text-xs sm:text-sm h-11 text-foreground font-medium">
                    <MapPin className="size-4 text-[#EF1A53] mr-1.5 shrink-0" />
                    <SelectValue placeholder="All Divisions" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 rounded-2xl">
                    <SelectItem value="all">All Divisions</SelectItem>
                    {divisions.map((d: { _id: string; name: string }) => (
                      <SelectItem key={d._id} value={d._id}>
                        {d.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Submit CTA */}
              <Button
                type="submit"
                className="w-full sm:w-auto px-7 h-11 rounded-xl sm:rounded-full bg-[#EF1A53] hover:bg-[#d81548] text-white font-bold text-sm shadow-md transition-transform active:scale-95 shrink-0 flex items-center justify-center gap-2"
              >
                <Search className="size-4" />
                <span>Search Tours</span>
              </Button>
            </form>

            {/* Quick Filter Tags below search */}
            <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
              <span className="text-white/70 font-medium">Popular:</span>
              {['Adventure', 'Relaxation', 'Heritage', 'Nature'].map((type) => {
                const match = tourTypes.find(
                  (t: { _id: string; name: string }) =>
                    t.name.toLowerCase() === type.toLowerCase()
                );
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      if (match) {
                        setSelectedTourType(selectedTourType === match._id ? '' : match._id);
                        setCurrentPage(1);
                      }
                    }}
                    className={`px-3 py-1 rounded-full backdrop-blur-md transition-all text-xs font-semibold ${
                      match && selectedTourType === match._id
                        ? 'bg-[#EF1A53] text-white shadow-md'
                        : 'bg-white/20 hover:bg-white/30 text-white border border-white/20'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MAIN CONTENT CONTAINER (FILTERS + TOURS GRID)
         ========================================================================= */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-4">
        {/* Mobile Filter Toggle Drawer Trigger */}
        <div className="lg:hidden mb-4 flex items-center justify-between gap-3 p-3 bg-card rounded-2xl border border-border/70 shadow-xs">
          <Button
            variant="outline"
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="flex-1 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 h-10 border-border/80"
          >
            <Filter className="size-4 text-[#EF1A53]" />
            <span>Filter Tours</span>
            {activeFiltersCount > 0 && (
              <Badge className="bg-[#EF1A53] text-white size-5 p-0 flex items-center justify-center rounded-full text-[10px]">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>

          {/* Quick Sort for Mobile */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40 rounded-xl h-10 text-xs font-medium border-border/80">
              <ArrowUpDown className="size-3.5 text-muted-foreground mr-1.5" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* =======================================================================
              FILTER SIDEBAR (DESKTOP STICKY / MOBILE COLLAPSED)
             ======================================================================= */}
          <aside
            className={`lg:col-span-3 transition-all duration-300 ${
              isMobileFilterOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="bg-card rounded-3xl border border-border/70 p-6 shadow-xs space-y-6 lg:sticky lg:top-24">
              {/* Filter Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border/60">
                <div className="flex items-center gap-2.5 font-bold text-foreground font-nunito text-lg">
                  <div className="p-2 rounded-xl bg-[#EF1A53]/10 text-[#EF1A53]">
                    <SlidersHorizontal className="size-4" />
                  </div>
                  <span>Filter Tours</span>
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="text-xs px-2 py-0.5 rounded-full font-bold">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </div>

                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleResetFilters}
                    className="text-xs text-muted-foreground hover:text-[#EF1A53] h-8 px-2 font-semibold"
                  >
                    <RotateCcw className="size-3 mr-1" />
                    Reset
                  </Button>
                )}
              </div>

              {/* 1. Division Filter */}
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                  <span>Destination Division</span>
                  {selectedDivision && (
                    <button
                      type="button"
                      onClick={() => setSelectedDivision('')}
                      className="text-[10px] text-[#EF1A53] hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </Label>
                <Select
                  value={selectedDivision}
                  onValueChange={(val) => {
                    setSelectedDivision(val === 'all' ? '' : val);
                    setCurrentPage(1);
                  }}
                  disabled={divisionLoading}
                >
                  <SelectTrigger className="w-full rounded-2xl h-11 border-border/70 text-xs sm:text-sm font-medium">
                    <SelectValue placeholder="All Divisions" />
                  </SelectTrigger>
                  <SelectContent className="max-h-64 rounded-2xl">
                    <SelectGroup>
                      <SelectLabel>Divisions</SelectLabel>
                      <SelectItem value="all">All Divisions</SelectItem>
                      {divisions.map((d: { _id: string; name: string }) => (
                        <SelectItem key={d._id} value={d._id}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* 2. Tour Type Filter */}
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                  <span>Tour Type</span>
                  {selectedTourType && (
                    <button
                      type="button"
                      onClick={() => setSelectedTourType('')}
                      className="text-[10px] text-[#EF1A53] hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </Label>
                <Select
                  value={selectedTourType}
                  onValueChange={(val) => {
                    setSelectedTourType(val === 'all' ? '' : val);
                    setCurrentPage(1);
                  }}
                  disabled={tourTypeLoading}
                >
                  <SelectTrigger className="w-full rounded-2xl h-11 border-border/70 text-xs sm:text-sm font-medium">
                    <SelectValue placeholder="All Tour Types" />
                  </SelectTrigger>
                  <SelectContent className="max-h-64 rounded-2xl">
                    <SelectGroup>
                      <SelectLabel>Tour Categories</SelectLabel>
                      <SelectItem value="all">All Tour Types</SelectItem>
                      {tourTypes.map((t: { _id: string; name: string }) => (
                        <SelectItem key={t._id} value={t._id}>
                          {t.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* 3. Price Range Filter */}
              <div className="space-y-3 pt-2 border-t border-border/50">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                  <span>Price Range (BDT)</span>
                  {(minPrice || maxPrice) && (
                    <button
                      type="button"
                      onClick={() => {
                        setMinPrice('');
                        setMaxPrice('');
                        setCurrentPage(1);
                      }}
                      className="text-[10px] text-[#EF1A53] hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </Label>

                {/* Min / Max Inputs */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground">
                      ৳
                    </span>
                    <Input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => {
                        setMinPrice(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="pl-7 rounded-xl text-xs h-10 border-border/70"
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground">
                      ৳
                    </span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => {
                        setMaxPrice(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="pl-7 rounded-xl text-xs h-10 border-border/70"
                    />
                  </div>
                </div>

                {/* Quick Budget Chips */}
                <div className="space-y-1.5 pt-1">
                  <p className="text-[11px] text-muted-foreground font-semibold">Quick Budget:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {BUDGET_PRESETS.map((preset) => {
                      const isActive = minPrice === preset.min && maxPrice === preset.max;
                      return (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => {
                            setMinPrice(preset.min);
                            setMaxPrice(preset.max);
                            setCurrentPage(1);
                          }}
                          className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all font-medium ${
                            isActive
                              ? 'bg-[#EF1A53] text-white border-[#EF1A53] shadow-xs'
                              : 'bg-muted/40 hover:bg-muted text-muted-foreground border-border/60 hover:text-foreground'
                          }`}
                        >
                          {preset.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Reset All Button */}
              {activeFiltersCount > 0 && (
                <Button
                  onClick={handleResetFilters}
                  variant="outline"
                  className="w-full rounded-2xl border-dashed border-border/80 text-xs font-bold text-muted-foreground hover:text-[#EF1A53] hover:border-[#EF1A53] h-10"
                >
                  <RotateCcw className="size-3.5 mr-2" />
                  Clear All Filters ({activeFiltersCount})
                </Button>
              )}
            </div>
          </aside>

          {/* =======================================================================
              RIGHT AREA: TOOLBAR + TOURS CATALOG GRID / LIST
             ======================================================================= */}
          <div className="lg:col-span-9 space-y-6">
            {/* Header Toolbar */}
            <div className="bg-card rounded-2xl border border-border/70 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
              {/* Left: Result Count & Active Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-base text-foreground font-nunito">
                  {tourLoading ? (
                    'Discovering tours...'
                  ) : (
                    <>
                      Available Tours{' '}
                      <span className="text-muted-foreground font-normal text-sm">
                        ({totalTours} found)
                      </span>
                    </>
                  )}
                </span>

                {/* Active Filter Badges */}
                {selectedDivision && (
                  <Badge
                    variant="secondary"
                    className="gap-1 pl-2.5 pr-1.5 py-1 text-xs rounded-full font-medium"
                  >
                    <span>{divisionMap.get(selectedDivision) || 'Division'}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedDivision('')}
                      className="hover:bg-muted rounded-full p-0.5"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                )}

                {selectedTourType && (
                  <Badge
                    variant="secondary"
                    className="gap-1 pl-2.5 pr-1.5 py-1 text-xs rounded-full font-medium"
                  >
                    <span>{tourTypeMap.get(selectedTourType) || 'Tour Type'}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedTourType('')}
                      className="hover:bg-muted rounded-full p-0.5"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                )}

                {searchTerm && (
                  <Badge
                    variant="secondary"
                    className="gap-1 pl-2.5 pr-1.5 py-1 text-xs rounded-full font-medium"
                  >
                    <span>"{searchTerm}"</span>
                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm('');
                        setTempSearchInput('');
                      }}
                      className="hover:bg-muted rounded-full p-0.5"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                )}
              </div>

              {/* Right: Sort and View Mode Switcher */}
              <div className="flex items-center gap-3 ml-auto">
                {/* Sort Dropdown */}
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-medium">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-44 rounded-xl h-9 text-xs font-medium border-border/80">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="featured">Featured Tours</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest Arrivals</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* View Mode Toggle (Grid vs List) */}
                <div className="flex items-center bg-muted/50 p-1 rounded-xl border border-border/60">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-all ${
                      viewMode === 'grid'
                        ? 'bg-card text-foreground shadow-xs font-semibold'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    title="Grid View"
                  >
                    <Grid3X3 className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg transition-all ${
                      viewMode === 'list'
                        ? 'bg-card text-foreground shadow-xs font-semibold'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    title="List View"
                  >
                    <List className="size-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* =====================================================================
                TOURS DISPLAY SECTION (SKELETON, CARDS, OR EMPTY STATE)
               ===================================================================== */}
            {tourLoading ? (
              /* High-end Shimmer Loading Skeleton */
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-card rounded-3xl border border-border/60 overflow-hidden shadow-xs animate-pulse"
                  >
                    <div className="h-56 bg-muted/60 relative" />
                    <div className="p-6 space-y-4">
                      <div className="h-6 w-3/4 bg-muted/80 rounded-md" />
                      <div className="h-4 w-1/2 bg-muted/60 rounded-md" />
                      <div className="space-y-2 py-1">
                        <div className="h-3.5 w-full bg-muted/40 rounded-md" />
                        <div className="h-3.5 w-4/5 bg-muted/40 rounded-md" />
                      </div>
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="h-10 bg-muted/40 rounded-xl" />
                        <div className="h-10 bg-muted/40 rounded-xl" />
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-border/40">
                        <div className="h-4 w-20 bg-muted/40 rounded-md" />
                        <div className="h-9 w-28 bg-muted/60 rounded-lg" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : tours && tours.length > 0 ? (
              /* Tours Grid or List View */
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-5'
                }
              >
                {tours.map((tour: ITourresponse, idx: number) => {
                  // Guaranteed deterministic fallback image
                  const fallbackImg = getTourFallbackImage(tour.title, idx);
                  const imageSrc =
                    tour.images && tour.images.length > 0 && tour.images[0]
                      ? tour.images[0]
                      : fallbackImg;
                  const typeName = tourTypeMap.get(tour.tourType) || 'Adventure';
                  const isWishlisted = wishlistedIds.has(tour._id);

                  if (viewMode === 'list') {
                    // Modern Horizontal List Card
                    return (
                      <div
                        key={tour._id}
                        className="group bg-card rounded-3xl border border-border/70 hover:border-[#EF1A53]/50 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row"
                      >
                        {/* Image Side */}
                        <div className="relative md:w-80 h-60 md:h-auto overflow-hidden bg-muted shrink-0">
                          <img
                            src={imageSrc}
                            alt={tour.title}
                            loading="lazy"
                            onError={(e) => handleTourImageError(e, fallbackImg)}
                            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                          {/* Tour Type Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="bg-[#EF1A53] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                              {typeName}
                            </span>
                          </div>

                          {/* Wishlist Heart */}
                          <button
                            type="button"
                            onClick={(e) => handleToggleWishlist(e, tour._id)}
                            className="absolute top-4 right-4 size-9 rounded-full bg-white/85 dark:bg-black/75 backdrop-blur-md flex items-center justify-center text-foreground hover:scale-110 shadow-md transition-all active:scale-90"
                            title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                          >
                            <Heart
                              className={`size-4 transition-colors ${
                                isWishlisted
                                  ? 'text-[#EF1A53] fill-[#EF1A53]'
                                  : 'text-zinc-600 dark:text-zinc-300 hover:text-[#EF1A53]'
                              }`}
                            />
                          </button>

                          {/* Price Tag on Image */}
                          <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-black/85 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg">
                            <span className="text-xs font-bold text-muted-foreground">From </span>
                            <span className="font-extrabold text-[#EF1A53] text-sm">
                              ৳{tour.costFrom?.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-muted-foreground font-medium">
                              {' '}
                              / person
                            </span>
                          </div>
                        </div>

                        {/* List Content Side */}
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <div className="flex items-center text-xs text-muted-foreground font-semibold">
                                <MapPin className="size-3.5 text-[#EF1A53] mr-1.5 shrink-0" />
                                <span className="truncate">{tour.location || 'Bangladesh'}</span>
                              </div>
                              <div className="flex items-center gap-1 text-xs font-bold text-foreground">
                                <Star className="size-3.5 text-amber-400 fill-amber-400" />
                                <span>4.9</span>
                                <span className="text-muted-foreground font-normal text-[11px]">
                                  (Verified)
                                </span>
                              </div>
                            </div>

                            <Link to={`/tour-details/${tour._id}`}>
                              <h3 className="text-xl font-bold text-foreground group-hover:text-[#EF1A53] transition-colors font-nunito line-clamp-1 mb-2">
                                {tour.title}
                              </h3>
                            </Link>

                            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                              {tour.description ||
                                'Discover breathtaking destinations, scenic landscapes, and authentic local cultural tours crafted for lifelong memories.'}
                            </p>

                            {/* Features Specs */}
                            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted/40 border border-border/50">
                                <Users className="size-3.5 text-blue-500" />
                                <strong className="text-foreground">
                                  {tour.maxGests || (tour as any).maxGuests || '1'}
                                </strong>{' '}
                                Guests Max
                              </span>
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-muted/40 border border-border/50">
                                <Calendar className="size-3.5 text-emerald-500" />
                                <strong className="text-foreground">
                                  {tour.minAge ? `${tour.minAge}+ Yrs` : 'All Ages'}
                                </strong>
                              </span>
                            </div>
                          </div>

                          {/* Footer Action */}
                          <div className="flex items-center justify-between pt-4 border-t border-border/60">
                            <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                              <CheckCircle2 className="size-3.5 text-emerald-500" /> Instant
                              Confirmation
                            </span>
                            <Button
                              asChild
                              className="bg-[#EF1A53] hover:bg-[#d81548] text-white px-5 rounded-xl font-bold text-xs shadow-md transition-all group-hover:shadow-lg"
                            >
                              <Link
                                to={`/tour-details/${tour._id}`}
                                className="flex items-center gap-1.5"
                              >
                                <span>View Details</span>
                                <ArrowRight className="size-3.5" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // Modern Grid Card
                  return (
                    <div
                      key={tour._id}
                      className="group bg-card rounded-3xl border border-border/70 hover:border-[#EF1A53]/50 shadow-xs hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
                    >
                      {/* Tour Image Container */}
                      <div className="relative aspect-16/10 overflow-hidden bg-muted">
                        <img
                          src={imageSrc}
                          alt={tour.title}
                          loading="lazy"
                          onError={(e) => handleTourImageError(e, fallbackImg)}
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                        />

                        {/* Dark Vignette Overlay for Crisp Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />

                        {/* Tour Type Badge */}
                        <div className="absolute top-3.5 left-3.5">
                          <span className="bg-[#EF1A53] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md backdrop-blur-md">
                            {typeName}
                          </span>
                        </div>

                        {/* Floating Wishlist Heart */}
                        <button
                          type="button"
                          onClick={(e) => handleToggleWishlist(e, tour._id)}
                          className="absolute top-3.5 right-3.5 size-9 rounded-full bg-white/85 dark:bg-black/75 backdrop-blur-md flex items-center justify-center text-foreground hover:scale-110 shadow-md transition-all active:scale-90"
                          title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                        >
                          <Heart
                            className={`size-4 transition-colors ${
                              isWishlisted
                                ? 'text-[#EF1A53] fill-[#EF1A53]'
                                : 'text-zinc-600 dark:text-zinc-300 hover:text-[#EF1A53]'
                            }`}
                          />
                        </button>

                        {/* Location Pill on Image */}
                        <div className="absolute bottom-3.5 left-3.5 flex items-center text-white text-xs font-semibold drop-shadow-md">
                          <div className="size-6 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center mr-1.5 border border-white/20">
                            <MapPin className="size-3 text-[#EF1A53]" />
                          </div>
                          <span className="truncate max-w-[140px]">
                            {tour.location || 'Bangladesh'}
                          </span>
                        </div>

                        {/* Floating Price Tag */}
                        <div className="absolute bottom-3.5 right-3.5 bg-white/95 dark:bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg">
                          <span className="text-[11px] font-bold text-muted-foreground">From </span>
                          <span className="font-extrabold text-[#EF1A53] text-xs sm:text-sm">
                            ৳{tour.costFrom?.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Tour Content */}
                      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Title & Star Rating */}
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="size-3 text-amber-400 fill-amber-400"
                                />
                              ))}
                              <span className="ml-1.5 text-xs font-bold text-foreground">
                                4.9
                              </span>
                            </div>
                            <span className="text-[11px] text-muted-foreground font-semibold">
                              Verified
                            </span>
                          </div>

                          <Link to={`/tour-details/${tour._id}`}>
                            <h3 className="text-lg font-bold text-foreground group-hover:text-[#EF1A53] transition-colors font-nunito line-clamp-1 mb-2">
                              {tour.title}
                            </h3>
                          </Link>

                          {/* Description */}
                          <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2 mb-4">
                            {tour.description ||
                              'Discover unforgettable destinations and scenic views carefully curated for adventurous travelers.'}
                          </p>

                          {/* Specs Grid */}
                          <div className="grid grid-cols-2 gap-2.5 mb-5">
                            <div className="flex items-center space-x-2 p-2 rounded-xl bg-muted/40 border border-border/50">
                              <div className="p-1.5 bg-blue-500/10 text-blue-600 rounded-lg">
                                <Users className="size-3.5" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">
                                  Capacity
                                </p>
                                <p className="font-extrabold text-xs truncate">
                                  {tour.maxGests || (tour as any).maxGuests || '1'} Guests
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2 p-2 rounded-xl bg-muted/40 border border-border/50">
                              <div className="p-1.5 bg-emerald-500/10 text-emerald-600 rounded-lg">
                                <Calendar className="size-3.5" />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">
                                  Min Age
                                </p>
                                <p className="font-extrabold text-xs truncate">
                                  {tour.minAge ? `${tour.minAge}+ Yrs` : 'All Ages'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Bar */}
                        <div className="flex justify-between items-center pt-4 border-t border-border/60 mt-auto">
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase font-bold">
                              Pricing
                            </p>
                            <p className="font-extrabold text-sm text-foreground">
                              ৳{tour.costFrom?.toLocaleString()}
                            </p>
                          </div>
                          <Link to={`/tour-details/${tour._id}`}>
                            <Button className="bg-[#EF1A53] hover:bg-[#d81548] text-white px-4 py-2 rounded-xl font-bold text-xs shadow-md transition-all group-hover:shadow-lg">
                              <span>View Details</span>
                              <ArrowRight className="size-3.5 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* High-End Empty State */
              <div className="text-center py-20 px-6 rounded-3xl border border-dashed border-border/80 bg-muted/15 space-y-4">
                <div className="size-20 mx-auto rounded-3xl bg-[#EF1A53]/10 flex items-center justify-center text-[#EF1A53] shadow-inner">
                  <Compass className="size-10 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground font-nunito mb-1.5">
                    No Matching Tours Found
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                    We couldn't find any tours matching your active destination, tour category, or
                    budget filters. Try loosening your search criteria.
                  </p>
                </div>
                <div className="pt-2">
                  <Button
                    onClick={handleResetFilters}
                    className="px-6 py-2.5 rounded-full bg-[#EF1A53] hover:bg-[#d81548] text-white font-bold text-xs shadow-md"
                  >
                    <RotateCcw className="size-3.5 mr-2" />
                    Reset All Filters
                  </Button>
                </div>
              </div>
            )}

            {/* =====================================================================
                PAGINATION BAR
               ===================================================================== */}
            {totalPages > 1 && (
              <div className="pt-8 pb-4 flex justify-center">
                <Pagination>
                  <PaginationContent className="bg-card rounded-2xl border border-border/70 p-1.5 shadow-xs">
                    <PaginationItem>
                      <PaginationPrevious
                        className={
                          currentPage === 1
                            ? 'pointer-events-none opacity-40 rounded-xl'
                            : 'cursor-pointer hover:bg-muted rounded-xl font-bold text-xs'
                        }
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          isActive={page === currentPage}
                          onClick={() => setCurrentPage(page)}
                          className={`rounded-xl text-xs font-bold cursor-pointer transition-all ${
                            page === currentPage
                              ? 'bg-[#EF1A53] text-white shadow-md hover:bg-[#d81548] hover:text-white'
                              : 'hover:bg-muted text-foreground'
                          }`}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    {totalPages > 5 && <PaginationItem><PaginationEllipsis /></PaginationItem>}

                    <PaginationItem>
                      <PaginationNext
                        className={
                          currentPage === totalPages
                            ? 'pointer-events-none opacity-40 rounded-xl'
                            : 'cursor-pointer hover:bg-muted rounded-xl font-bold text-xs'
                        }
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tours;