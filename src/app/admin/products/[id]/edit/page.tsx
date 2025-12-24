'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/components/ui/Toast';
import { PRODUCT_CATEGORIES } from '@/lib/constants';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string;
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>(['']);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    story: '',
    price: '',
    category: '',
    sku: '',
    stock: '',
    weight: '',
    dimensions: '',
    featured: false,
    active: true,
  });

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/admin/products/${productId}`);
      if (response.ok) {
        const { data } = await response.json();
        const product = data;
        
        setFormData({
          name: product.name,
          slug: product.slug,
          description: product.description || '',
          story: product.story || '',
          price: product.price.toString(),
          category: product.category || '',
          sku: product.sku,
          stock: product.stockQuantity.toString(),
          weight: product.weight?.toString() || '',
          dimensions: product.dimensions || '',
          featured: product.featured,
          active: product.active,
        });
        
        setImages(product.images || []);
        setMaterials(product.materials.length > 0 ? product.materials : ['']);
      } else {
        const error = await response.json();
        showToast(error.error || 'Failed to load product', 'error');
        router.push('/admin/products');
      }
    } catch (error) {
      console.error('Error loading product:', error);
      showToast('Failed to load product', 'error');
      router.push('/admin/products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImages(true);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('file', files[i]);

        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        
        if (response.ok && result.url) {
          uploadedUrls.push(result.url);
        } else {
          showToast(`Failed to upload ${files[i].name}`, 'error');
        }
      }

      setImages([...images, ...uploadedUrls]);
      showToast(`${uploadedUrls.length} image(s) uploaded successfully!`);
    } catch (error) {
      console.error('Error uploading images:', error);
      showToast('Failed to upload images', 'error');
    } finally {
      setUploadingImages(false);
    }
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const addImageField = () => {
    setImages([...images, '']);
  };

  const removeImageField = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleMaterialChange = (index: number, value: string) => {
    const newMaterials = [...materials];
    newMaterials[index] = value;
    setMaterials(newMaterials);
  };

  const addMaterialField = () => {
    setMaterials([...materials, '']);
  };

  const removeMaterialField = (index: number) => {
    setMaterials(materials.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const filteredImages = images.filter(img => img.trim() !== '');
      const filteredMaterials = materials.filter(mat => mat.trim() !== '');

      const productData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        story: formData.story,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stock),
        sku: formData.sku,
        weight: formData.weight ? formData.weight : null,
        dimensions: formData.dimensions,
        featured: formData.featured,
        active: formData.active,
        images: filteredImages,
        materials: filteredMaterials,
      };

      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        showToast('Product updated successfully!');
        router.push('/admin/products');
      } else {
        const error = await response.json();
        showToast(error.error || 'Failed to update product', 'error');
      }
    } catch (error) {
      console.error('Update error:', error);
      showToast('Failed to update product', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <p className="text-lg">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary py-16">
      <div className="container-custom max-w-4xl">
        <div className="mb-8">
          <Link href="/admin/products" className="text-sm text-primary/60 hover:text-accent mb-2 inline-block">
            ← Back to Products
          </Link>
          <h1 className="text-4xl font-serif">Edit Product</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-serif border-b pb-2">Basic Information</h2>
            
            <div>
              <label className="block text-sm font-medium mb-1">Product Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Slug *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">URL-friendly identifier</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="">Select a category</option>
                {PRODUCT_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Upload Images</label>
              <input
                type="file"
                multiple
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handleImageUpload}
                disabled={uploadingImages}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent/90 disabled:opacity-50"
              />
              {uploadingImages && (
                <p className="text-sm text-gray-600 mt-2">Uploading images...</p>
              )}
            </div>

            {images.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Uploaded Images ({images.length}):</p>
                <div className="grid grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-full h-32 object-cover rounded border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {images.map((image, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-accent focus:border-transparent"
                />
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addImageField}
              className="px-4 py-2 bg-gray-200 text-primary rounded hover:bg-gray-300"
            >
              Add Image URL
            </button>
          </div>

          {/* Pricing & Inventory */}
          <div className="space-y-4">
            <h2 className="text-xl font-serif border-b pb-2">Pricing & Inventory</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Price (₹) *</label>
                <input
                  type="number"
                  required
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Stock Quantity *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">SKU *</label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
          </div>

          {/* Physical Details */}
          <div className="space-y-4">
            <h2 className="text-xl font-serif border-b pb-2">Physical Details</h2>
            
            <div>
              <label className="block text-sm font-medium mb-1">Materials</label>
              {materials.map((material, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={material}
                    onChange={(e) => handleMaterialChange(index, e.target.value)}
                    placeholder="e.g., Sterling Silver, Mahogany Wood"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                  {materials.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMaterialField(index)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addMaterialField}
                className="px-4 py-2 bg-gray-200 text-primary rounded hover:bg-gray-300"
              >
                Add Material
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Dimensions</label>
                <input
                  type="text"
                  value={formData.dimensions}
                  onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                  placeholder="e.g., 10 x 8 x 5 inches"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-4">
            <h2 className="text-xl font-serif border-b pb-2">Status</h2>
            
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-accent focus:ring-accent"
                />
                <span className="text-sm font-medium">Featured Product</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 text-accent focus:ring-accent"
                />
                <span className="text-sm font-medium">Active (Visible on site)</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-accent text-white py-3 rounded hover:bg-accent/90 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
            <Link
              href="/admin/products"
              className="px-8 py-3 bg-gray-200 text-primary rounded hover:bg-gray-300 font-medium text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
