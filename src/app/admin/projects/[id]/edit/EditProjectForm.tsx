"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProject } from "@/lib/actions/project.actions";
import { CldUploadWidget } from "next-cloudinary";
import Link from "next/link";
import { Trash2, Plus } from "lucide-react";

const INDUSTRIES = [
  "Education", "Hospitality", "Retail & POS", "Real Estate", 
  "Agriculture", "Healthcare", "Manufacturing", "Government"
];

import { IProject } from "@/types/project";

export default function EditProjectForm({ project }: { project: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  
  // Determine initial industry selection
  const isCustomIndustry = !INDUSTRIES.includes(project.industry);
  const [industrySelect, setIndustrySelect] = useState(isCustomIndustry ? "Other" : project.industry);
  const [customIndustry, setCustomIndustry] = useState(isCustomIndustry ? project.industry : "");

  const [formData, setFormData] = useState({
    name: project.name || "",
    slug: project.slug || "",
    status: project.status || "in_development",
    summary: project.summary || "",
    description: project.description || "",
    liveUrl: project.liveUrl || "",
    subdomain: project.subdomain || "",
    videoUrl: project.videoUrl || "",
    heroImageUrl: project.heroImageUrl || "",
    gallery: project.gallery || [],
    features: project.features || []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const finalIndustry = industrySelect === "Other" ? customIndustry : industrySelect;
    if (!finalIndustry) {
      setError("Please select or enter an industry.");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      ...formData,
      industry: finalIndustry
    };

    const res = await updateProject(project._id, payload);
    
    if (res.success) {
      setIsSuccess(true);
    } else {
      setError(res.error || "Failed to update project");
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (isSuccess) {
    return (
      <div style={{ maxWidth: 600, margin: "100px auto", textAlign: "center", background: "#F0FDF4", padding: 60, borderRadius: 24, border: "1px solid #BBF7D0" }}>
        <div style={{ width: 64, height: 64, background: "#22C55E", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 32 }}>✓</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "#166534", marginBottom: 16 }}>Project Updated!</h1>
        <p style={{ fontSize: 16, color: "#15803D", marginBottom: 32 }}>Your changes have been saved and are live on the frontend.</p>
        <Link href="/admin/projects" style={{ padding: "14px 28px", background: "#16A34A", color: "#fff", borderRadius: 8, fontWeight: 700, textDecoration: "none" }}>
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, { title: "", desc: "", subtitle: "", image: "" }]
    }));
  };

  const updateFeature = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const newFeatures = [...prev.features];
      newFeatures[index] = { ...newFeatures[index], [field]: value };
      return { ...prev, features: newFeatures };
    });
  };

  const removeFeature = (index: number) => {
    setFormData(prev => {
      const newFeatures = [...prev.features];
      newFeatures.splice(index, 1);
      return { ...prev, features: newFeatures };
    });
  };

  const inputStyle = { padding: "10px 12px", borderRadius: 8, border: "1px solid #CBD5E1", width: "100%", background: "#fff" };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", paddingBottom: 100 }}>
      <div style={{ marginBottom: 32, display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/admin/projects" style={{ color: "#64748B", textDecoration: "none" }}>← Back</Link>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0F172A" }}>Edit Project</h1>
      </div>

      {error && (
        <div style={{ background: "#FEE2E2", color: "#991B1B", padding: "12px 16px", borderRadius: 8, marginBottom: 24, fontSize: 14 }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        
        {/* BASIC DETAILS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, borderBottom: "1px solid #E2E8F0", paddingBottom: 8 }}>Basic Details</h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600, color: "#475569" }}>Project Name *</label>
              <input required name="name" value={formData.name} onChange={handleChange} style={inputStyle} />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600, color: "#475569" }}>URL Slug *</label>
              <input required name="slug" value={formData.slug} onChange={handleChange} style={inputStyle} placeholder="e.g., school-management" />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600, color: "#475569" }}>Industry *</label>
              <select required value={industrySelect} onChange={(e) => setIndustrySelect(e.target.value)} style={inputStyle}>
                <option value="" disabled>Select an industry...</option>
                {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                <option value="Other">Other (Type below)</option>
              </select>
              {industrySelect === "Other" && (
                <input required placeholder="Type new industry..." value={customIndustry} onChange={(e) => setCustomIndustry(e.target.value)} style={{...inputStyle, marginTop: 4}} />
              )}
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600, color: "#475569" }}>Status *</label>
              <select required name="status" value={formData.status} onChange={handleChange} style={inputStyle}>
                <option value="live">Live</option>
                <option value="in_development">In Development</option>
                <option value="planned">Planned</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 600, color: "#475569" }}>One-line Summary *</label>
            <input required name="summary" value={formData.summary} onChange={handleChange} style={inputStyle} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600, color: "#475569" }}>Subdomain URL</label>
              <input name="subdomain" value={formData.subdomain} onChange={handleChange} style={inputStyle} placeholder="e.g. school.solforbs.com" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600, color: "#475569" }}>Live URL</label>
              <input name="liveUrl" value={formData.liveUrl} onChange={handleChange} style={inputStyle} placeholder="External link if any" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={{ fontSize: 14, fontWeight: 600, color: "#475569" }}>Video URL</label>
              <input name="videoUrl" value={formData.videoUrl} onChange={handleChange} style={inputStyle} placeholder="YouTube / Vimeo link" />
            </div>
          </div>
        </div>

        {/* DYNAMIC FEATURE BUILDER */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "1px solid #E2E8F0", paddingBottom: 8 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700 }}>Dynamic Features (Carousel Cards)</h2>
            <button type="button" onClick={addFeature} style={{ padding: "6px 12px", background: "#F1F5F9", color: "#0F172A", borderRadius: 6, fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              <Plus size={16} /> Add Feature
            </button>
          </div>
          
          {formData.features.map((feature: any, index: number) => (
            <div key={index} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 12, padding: 20, position: "relative" }}>
              <button type="button" onClick={() => removeFeature(index)} style={{ position: "absolute", top: 16, right: 16, background: "transparent", border: "none", color: "#EF4444", cursor: "pointer" }}>
                <Trash2 size={18} />
              </button>
              
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: "#475569" }}>Feature #{index + 1}</h4>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 600 }}>Title (e.g. Biometric clock-ins)</label>
                  <input required value={feature.title} onChange={(e) => updateFeature(index, "title", e.target.value)} style={inputStyle} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 600 }}>Subtitle/Label (e.g. Attendance)</label>
                  <input required value={feature.subtitle} onChange={(e) => updateFeature(index, "subtitle", e.target.value)} style={inputStyle} />
                </div>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 600 }}>Description</label>
                <textarea required value={feature.desc} onChange={(e) => updateFeature(index, "desc", e.target.value)} style={{...inputStyle, resize: "vertical"}} rows={2} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600 }}>Feature Image</label>
                {feature.image && (
                  <img src={feature.image} alt="Feature" style={{ height: 80, objectFit: "cover", borderRadius: 6, marginBottom: 8 }} />
                )}
                <CldUploadWidget uploadPreset="ml_default" onSuccess={(result: any) => updateFeature(index, "image", result.info.secure_url)}>
                  {({ open }) => (
                    <button type="button" onClick={() => open()} style={{ padding: "8px 16px", background: "#E2E8F0", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, alignSelf: "flex-start" }}>
                      Upload Feature Image
                    </button>
                  )}
                </CldUploadWidget>
              </div>
            </div>
          ))}
          
          {formData.features.length === 0 && (
            <div style={{ textAlign: "center", padding: 30, background: "#F8FAFC", borderRadius: 12, border: "1px dashed #CBD5E1", color: "#64748B" }}>
              No features added. Click &quot;Add Feature&quot; to create carousel cards.
            </div>
          )}
        </div>

        {/* MEDIA UPLOADS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, borderBottom: "1px solid #E2E8F0", paddingBottom: 8 }}>Media Gallery (Cloudinary)</h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 24, background: "#F8FAFC", padding: 24, borderRadius: 12, border: "1px solid #E2E8F0" }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Hero Image (Main Cover)</p>
              {formData.heroImageUrl && (
                <img src={formData.heroImageUrl} alt="Hero" style={{ height: 140, objectFit: "cover", borderRadius: 8, marginBottom: 12, border: "1px solid #E2E8F0" }} />
              )}
              <CldUploadWidget uploadPreset="ml_default" onSuccess={(result: any) => {
                setFormData(prev => ({ ...prev, heroImageUrl: result.info.secure_url }))
              }}>
                {({ open }) => (
                  <button type="button" onClick={() => open()} style={{ padding: "8px 16px", background: "#E2E8F0", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                    Upload Hero Image
                  </button>
                )}
              </CldUploadWidget>
            </div>

            <hr style={{ borderTop: "1px solid #E2E8F0", borderBottom: "none", margin: 0 }} />

            <div>
              <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Gallery Screenshots (Bulk Upload Supported)</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
                {formData.gallery.map((img: any, i: number) => (
                  <div key={i} style={{ position: "relative" }}>
                    <img src={img.url} alt="Gallery" style={{ height: 100, width: 140, objectFit: "cover", borderRadius: 8, border: "1px solid #E2E8F0" }} />
                    <button type="button" onClick={() => {
                      const newGallery = [...formData.gallery];
                      newGallery.splice(i, 1);
                      setFormData(prev => ({ ...prev, gallery: newGallery }));
                    }} style={{ position: "absolute", top: -6, right: -6, background: "#EF4444", color: "#fff", border: "none", borderRadius: "50%", width: 24, height: 24, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      ×
                    </button>
                  </div>
                ))}
              </div>
              
              <CldUploadWidget uploadPreset="ml_default" options={{ multiple: true }} onSuccess={(result: any) => {
                setFormData(prev => ({ 
                  ...prev, 
                  gallery: [...prev.gallery, { url: result.info.secure_url, alt: "Screenshot" }]
                }))
              }}>
                {({ open }) => (
                  <button type="button" onClick={() => open()} style={{ padding: "8px 16px", background: "#E2E8F0", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                    Add Gallery Images
                  </button>
                )}
              </CldUploadWidget>
            </div>
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} style={{
          padding: "16px", background: "#0E5BFF", color: "#fff", borderRadius: 10, 
          fontSize: 16, fontWeight: 700, border: "none", cursor: isSubmitting ? "wait" : "pointer",
          marginTop: 16, opacity: isSubmitting ? 0.7 : 1, boxShadow: "0 4px 16px rgba(14,91,255,0.2)"
        }}>
          {isSubmitting ? "Saving Changes..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
