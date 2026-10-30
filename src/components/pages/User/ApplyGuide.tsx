import { useState, useEffect } from "react";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import {
  useApplyForGuideMutation,
  useGetMyGuideApplicationQuery,
} from "@/redux/features/guideApplication/guideApplication.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Compass,
  CheckCircle2,
  Clock,
  XCircle,
  Sparkles,
  MapPin,
  Languages,
  Award,
  Send,
  AlertCircle,
  FileText,
  UserCheck,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router";

const DEFAULT_SPECIALTIES = [
  "Sylhet & Sreemangal",
  "Bandarban & Hills",
  "Cox's Bazar Beach",
  "Sajek Valley",
  "Sundarbans Mangrove",
  "Rangamati Lake",
  "Old Dhaka Heritage",
  "Trekking & Hiking",
  "Birdwatching & Nature",
  "Photography Expeditions",
];

const DEFAULT_LANGUAGES = [
  "Bengali",
  "English",
  "Hindi",
  "Sylheti",
  "Chittagonian",
  "Arabic",
];

export default function ApplyGuide() {
  const { data: userData, isLoading: isUserLoading } = useUserInfoQuery(undefined);
  const { data: appData, isLoading: isAppLoading } = useGetMyGuideApplicationQuery(undefined);
  const [applyForGuide, { isLoading: isSubmitting }] = useApplyForGuideMutation();

  const user = userData?.data;
  const application = appData?.data;
  const isAlreadyGuide = user?.role === "GUIDE";

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [nidOrPassport, setNidOrPassport] = useState("");
  const [experienceYears, setExperienceYears] = useState<number | string>(1);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([
    "Sylhet & Sreemangal",
    "Trekking & Hiking",
  ]);
  const [customSpecialty, setCustomSpecialty] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([
    "Bengali",
    "English",
  ]);
  const [bio, setBio] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isEditingAfterReject, setIsEditingAfterReject] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.name || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const toggleSpecialty = (item: string) => {
    if (selectedSpecialties.includes(item)) {
      setSelectedSpecialties(selectedSpecialties.filter((s) => s !== item));
    } else {
      setSelectedSpecialties([...selectedSpecialties, item]);
    }
  };

  const addCustomSpecialty = () => {
    if (customSpecialty.trim() && !selectedSpecialties.includes(customSpecialty.trim())) {
      setSelectedSpecialties([...selectedSpecialties, customSpecialty.trim()]);
      setCustomSpecialty("");
    }
  };

  const toggleLanguage = (item: string) => {
    if (selectedLanguages.includes(item)) {
      setSelectedLanguages(selectedLanguages.filter((l) => l !== item));
    } else {
      setSelectedLanguages([...selectedLanguages, item]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) return toast.error("Please enter your full legal name");
    if (!phone.trim()) return toast.error("Please provide your contact phone number");
    if (!nidOrPassport.trim()) return toast.error("Please provide your National ID or Passport Number");
    if (Number(experienceYears) < 0) return toast.error("Experience years cannot be negative");
    if (selectedSpecialties.length === 0) return toast.error("Please select at least 1 tour specialty or region");
    if (selectedLanguages.length === 0) return toast.error("Please select at least 1 spoken language");
    if (!bio.trim() || bio.trim().length < 30) {
      return toast.error("Please provide a bio of at least 30 characters about your guiding experience");
    }
    if (!agreedToTerms) {
      return toast.error("Please agree to the Tour Guide Code of Conduct before applying");
    }

    try {
      await applyForGuide({
        fullName,
        phone,
        nidOrPassport,
        experienceYears: Number(experienceYears),
        specialties: selectedSpecialties,
        languages: selectedLanguages,
        bio,
        portfolioUrl: portfolioUrl.trim() || undefined,
      }).unwrap();

      toast.success("Application submitted successfully! Our Admin team will review your credentials.");
      setIsEditingAfterReject(false);
    } catch (err: any) {
      toast.error(err?.data?.message || err?.message || "Failed to submit application. Please try again.");
    }
  };

  if (isUserLoading || isAppLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  // 1. If user is already a certified GUIDE
  if (isAlreadyGuide) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 py-6">
        <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-background to-background overflow-hidden relative shadow-lg">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Award className="w-64 h-64 text-emerald-500" />
          </div>
          <CardHeader className="relative z-10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white gap-1 mb-1">
                  <Sparkles className="w-3.5 h-3.5" /> Certified WanderGo Tour Guide
                </Badge>
                <CardTitle className="text-2xl font-bold tracking-tight">
                  Welcome to the WanderGo Guide Guild, {user?.name}!
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground mt-1">
                  Your profile has been verified and elevated to official Tour Guide status.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl border bg-card/60 backdrop-blur-sm">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 mb-2" />
                <h4 className="font-semibold text-sm">Official Badge Active</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Travelers can identify you as a verified guide across all tours and itineraries.
                </p>
              </div>
              <div className="p-4 rounded-xl border bg-card/60 backdrop-blur-sm">
                <Compass className="w-6 h-6 text-primary mb-2" />
                <h4 className="font-semibold text-sm">Tour Assignment Ready</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  You are eligible to be assigned by admins to lead upcoming expeditions.
                </p>
              </div>
              <div className="p-4 rounded-xl border bg-card/60 backdrop-blur-sm">
                <Award className="w-64 h-6 text-amber-500 mb-2" />
                <h4 className="font-semibold text-sm">5-Star Traveler Trust</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Deliver exceptional experiences to earn community badges and traveler tips.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button asChild className="bg-primary text-white">
                <Link to="/profile">
                  <UserCheck className="w-4 h-4 mr-2" />
                  View Guide Profile
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/tour">
                  Explore Active Tours
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 2. If user has an active PENDING application
  if (application && application.status === "PENDING" && !isEditingAfterReject) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 py-6">
        <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-background to-background shadow-lg overflow-hidden">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl animate-pulse">
                  <Clock className="w-8 h-8" />
                </div>
                <div>
                  <Badge variant="outline" className="border-amber-500 text-amber-600 dark:text-amber-400 gap-1 mb-1 font-semibold">
                    <Clock className="w-3.5 h-3.5 animate-spin" /> Application Under Review
                  </Badge>
                  <CardTitle className="text-2xl font-bold">
                    Your Application Has Been Received
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mt-1">
                    Submitted on {new Date(application.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
              Our Admin and Super Admin team is currently verifying your national identification, tour experience, and language skills. Once approved by any admin, your account role will be automatically upgraded to <strong>Tour Guide</strong>.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border bg-card/60 space-y-2">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Applicant</span>
                <p className="font-semibold text-base">{application.fullName}</p>
                <p className="text-xs text-muted-foreground">{application.email} • {application.phone}</p>
                <p className="text-xs text-muted-foreground">ID/Passport: <span className="font-mono font-medium text-foreground">{application.nidOrPassport}</span></p>
              </div>

              <div className="p-4 rounded-lg border bg-card/60 space-y-2">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Experience</span>
                <p className="font-semibold text-base">{application.experienceYears} {application.experienceYears === 1 ? "Year" : "Years"} Guiding</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {application.languages?.map((lang: string) => (
                    <Badge key={lang} variant="secondary" className="text-[11px]">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border bg-card/60 space-y-2">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Specialties & Regions</span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {application.specialties?.map((spec: string) => (
                  <Badge key={spec} variant="outline" className="border-primary/30 text-primary text-xs">
                    <MapPin className="w-3 h-3 mr-1" /> {spec}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-lg border bg-card/60 space-y-1">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Submitted Bio</span>
              <p className="text-sm text-muted-foreground italic leading-relaxed">"{application.bio}"</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 3. If application was REJECTED and user is not yet editing
  if (application && application.status === "REJECTED" && !isEditingAfterReject) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 py-6">
        <Card className="border-destructive/30 bg-gradient-to-br from-destructive/10 via-background to-background shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-destructive/20 text-destructive rounded-xl">
                <XCircle className="w-8 h-8" />
              </div>
              <div>
                <Badge variant="destructive" className="mb-1">
                  Application Not Approved
                </Badge>
                <CardTitle className="text-2xl font-bold">Review Decision Notice</CardTitle>
                <CardDescription className="text-sm text-muted-foreground mt-1">
                  Reviewed on {application.reviewedAt ? new Date(application.reviewedAt).toLocaleDateString() : "Recently"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/5 space-y-2">
              <h4 className="font-semibold text-sm text-destructive flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> Admin Feedback:
              </h4>
              <p className="text-sm text-muted-foreground">
                {application.adminFeedback || "Your application did not meet the minimum verification criteria at this time."}
              </p>
            </div>

            <p className="text-sm text-muted-foreground">
              Don't worry! You can update your details, provide clearer verification information, and resubmit your application for review anytime.
            </p>

            <Button
              onClick={() => {
                setIsEditingAfterReject(true);
                setFullName(application.fullName || user?.name || "");
                setPhone(application.phone || user?.phone || "");
                setNidOrPassport(application.nidOrPassport || "");
                setExperienceYears(application.experienceYears || 1);
                setSelectedSpecialties(application.specialties || DEFAULT_SPECIALTIES.slice(0, 2));
                setSelectedLanguages(application.languages || ["Bengali", "English"]);
                setBio(application.bio || "");
                setPortfolioUrl(application.portfolioUrl || "");
              }}
              className="bg-primary text-white"
            >
              Update and Resubmit Application
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 4. Application Form (New or Resubmission)
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/95 via-primary/85 to-rose-600 text-white p-8 md:p-10 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Career Opportunity
          </Badge>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Become a Certified WanderGo Tour Guide
          </h1>
          <p className="text-white/90 text-sm md:text-base leading-relaxed">
            Lead adventurous travelers, showcase the enchanting beauty of Bangladesh, and build a rewarding career with our verified local guide network.
          </p>
        </div>
        <div className="absolute -right-8 -bottom-8 opacity-15 pointer-events-none">
          <Compass className="w-72 h-72" />
        </div>
      </div>

      {/* Guide Perks */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border bg-card flex items-start gap-3 shadow-sm">
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">Certified Status</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Stand out with an official WanderGo verification badge.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-card flex items-start gap-3 shadow-sm">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">Lead Expeditions</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Guide exciting groups through your favorite destinations.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-card flex items-start gap-3 shadow-sm">
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">Direct Admin Review</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Swift review & instant automatic role elevation upon approval.
            </p>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <Card className="border shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Tour Guide Application Form
          </CardTitle>
          <CardDescription>
            Please provide accurate details. All submissions are reviewed directly by the WanderGo administration team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Contact & Legal Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b pb-2">
                1. Personal & Verification Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName">Full Legal Name *</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Asaduzzaman Noor"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +880 1712-345678"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="nidOrPassport">National ID (NID) or Passport Number *</Label>
                  <Input
                    id="nidOrPassport"
                    value={nidOrPassport}
                    onChange={(e) => setNidOrPassport(e.target.value)}
                    placeholder="e.g. 1995267123456789 or A12345678"
                    required
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Required for traveler security and admin verification.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="experienceYears">Years of Guiding Experience *</Label>
                  <Input
                    id="experienceYears"
                    type="number"
                    min="0"
                    max="50"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    placeholder="e.g. 2"
                    required
                  />
                </div>
              </div>
            </div>

            {/* 2. Specialties & Preferred Destinations */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  2. Guiding Specialties & Destinations *
                </h3>
                <span className="text-xs text-muted-foreground">
                  {selectedSpecialties.length} selected
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Click to select the regions or travel styles you are most experienced in:
              </p>
              <div className="flex flex-wrap gap-2">
                {DEFAULT_SPECIALTIES.map((spec) => {
                  const isSelected = selectedSpecialties.includes(spec);
                  return (
                    <button
                      key={spec}
                      type="button"
                      onClick={() => toggleSpecialty(spec)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 border ${
                        isSelected
                          ? "bg-primary text-white border-primary shadow-sm"
                          : "bg-muted/50 hover:bg-muted text-muted-foreground border-transparent"
                      }`}
                    >
                      <MapPin className="w-3 h-3" />
                      {spec}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 max-w-sm pt-1">
                <Input
                  value={customSpecialty}
                  onChange={(e) => setCustomSpecialty(e.target.value)}
                  placeholder="Add custom region or skill..."
                  className="text-xs h-9"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCustomSpecialty();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={addCustomSpecialty}
                  className="h-9 text-xs"
                >
                  Add
                </Button>
              </div>
            </div>

            {/* 3. Spoken Languages */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  3. Spoken Languages *
                </h3>
                <span className="text-xs text-muted-foreground">
                  {selectedLanguages.length} selected
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {DEFAULT_LANGUAGES.map((lang) => {
                  const isSelected = selectedLanguages.includes(lang);
                  return (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => toggleLanguage(lang)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 border ${
                        isSelected
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                          : "bg-muted/50 hover:bg-muted text-muted-foreground border-transparent"
                      }`}
                    >
                      <Languages className="w-3 h-3" />
                      {lang}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Bio & Motivation */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b pb-2">
                4. About You & Guiding Style *
              </h3>
              <div className="space-y-1.5">
                <Label htmlFor="bio">
                  Tell Travelers About Yourself & Why You Love Guiding *
                </Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Share your guiding background, favorite landmarks, how you ensure traveler safety, and fun stories from past trips..."
                  required
                />
                <p className="text-[11px] text-muted-foreground">
                  Minimum 30 characters. This bio will be visible to travelers when assigned to tours.
                </p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="portfolioUrl">
                  Portfolio, Certificate, or LinkedIn Profile Link (Optional)
                </Label>
                <Input
                  id="portfolioUrl"
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="https://drive.google.com/... or https://linkedin.com/in/..."
                />
              </div>
            </div>

            {/* 5. Terms Agreement */}
            <div className="p-4 rounded-xl border bg-muted/30 space-y-3">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                  I certify that all the information provided above is true and authentic. I pledge to prioritize traveler safety, represent WanderGo with dignity and hospitality, and adhere to local environmental protection standards.
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                disabled={isSubmitting || !agreedToTerms}
                className="bg-primary hover:bg-primary/90 text-white min-w-[200px] h-11"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 animate-spin" /> Submitting Application...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" /> Submit Application for Review
                  </span>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
