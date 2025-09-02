import { useState } from 'react';
import { Copy, Check, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LinkLux = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const generateShortUrl = () => {
    // Simple URL shortener simulation
    const shortCode = Math.random().toString(36).substring(2, 8);
    return `linklux.io/${shortCode}`;
  };

  const handleShortenLink = async () => {
    if (!inputUrl.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a URL to shorten",
        variant: "destructive",
      });
      return;
    }

    if (!isValidUrl(inputUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL (include https://)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const shortened = generateShortUrl();
      setShortenedUrl(shortened);
      setIsLoading(false);
      toast({
        title: "Link shortened successfully!",
        description: "Your premium short link is ready",
      });
    }, 1500);
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`https://${shortenedUrl}`);
      setCopied(true);
      toast({
        title: "Copied to clipboard!",
        description: "Your short link is ready to share",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleShortenLink();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 glass rounded-2xl">
              <LinkIcon className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-5xl font-light tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              LinkLux
            </h1>
          </div>
          <p className="text-xl text-muted-foreground font-light">
            Premium link shortening, reimagined
          </p>
        </div>

        {/* Main Input Section */}
        <div className="space-y-6 fade-in-delay">
          <div className="glass-input rounded-2xl p-6 space-y-4 float-animation">
            <div className="space-y-3">
              <label htmlFor="url-input" className="block text-sm font-bold text-foreground">
                Enter your link
              </label>
              <input
                id="url-input"
                type="url"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="https://your-long-url.com/very/long/path"
                className="w-full bg-transparent border-0 text-lg font-light placeholder:text-muted-foreground/50 focus:outline-none focus:ring-0 py-3"
                disabled={isLoading}
              />
            </div>
            
            <button
              onClick={handleShortenLink}
              disabled={isLoading}
              className="w-full glass rounded-xl py-4 px-6 text-lg font-medium text-primary-foreground bg-primary/90 backdrop-blur-sm border border-primary/20 hover:bg-primary hover:glow-primary hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Creating your premium link...
                </div>
              ) : (
                'Shorten Link'
              )}
            </button>
          </div>
        </div>

        {/* Result Section */}
        {shortenedUrl && (
          <div className="glass-input rounded-2xl p-6 float-animation fade-in-delay-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground">Your premium short link</h3>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-muted/20 rounded-xl border border-glass-border/30">
                <div className="flex-1">
                  <p className="text-lg font-medium text-primary break-all">
                    https://{shortenedUrl}
                  </p>
                </div>
                <button
                  onClick={handleCopyToClipboard}
                  className="p-3 glass rounded-lg hover:glow-primary hover:scale-105 transition-all duration-200 group"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  )}
                </button>
              </div>
              
              <div className="text-center">
                <button
                  onClick={() => {
                    setInputUrl('');
                    setShortenedUrl('');
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light"
                >
                  Shorten another link
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center fade-in-delay-2">
          <p className="text-sm text-muted-foreground font-light">
            Crafted with precision for the modern web
          </p>
        </div>
      </div>
    </div>
  );
};

export default LinkLux;