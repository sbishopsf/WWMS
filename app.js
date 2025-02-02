import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, Plus, Edit2, Check, Trash2, ChevronDown, ChevronRight, Upload, Loader2 } from 'lucide-react';

export default function QuoteGenerator() {
  const defaultQuotes = [
    "That's like making love in a hammock...standing up.",
    "I like what you did much better than what you said about it.",
    "When responding to high originality, be highly original as opposed to admirably derivative.",
    "If you don't take risks, you don't get gifts.",
    "If you don't knock, no one says hello.",
    "That's art with a capital F!"
    "I like it, but I wish you wouldn't wear those stupid T-shirts.",
    "What baffles me...is how someone wearing a t-shirt so STUPID could design something so elegant.",
    "Stop. don't. stop. don't. stop. don't stop, don't.",
    "Use design to design.",
    "Don't ask, what is it. Ask...what is it of",
    "Audacious.",
    "You don't have enough taste, to know, you don't have taste.",
    "You can speak through design.  Now learn to sing.  I can't wait to hear your voice.",
    "It's too loose... I want you to suffer.",
    "There’s no substitute for talent.",
    "Never leave well enough alone.",
    "Let the constraints be the inspiration.",
    "Let the design create the need.",
    "Do you look at a diagram when you make love?",
    "Design is in the details, and they are all, details.",
    "Ecco punto!",
    "If you had invented fire, we would have said 'Wow'. But you didn't.",
    "I hope you fall down and land on that idea, and you'll probably end up with a more interesting idea than what you have right now.",
    "That is something your mom would like.",
    "Your work just requires too much foreplay to enjoy.",
    "It's charming. It's witty. It's Italian!",
    "Here's a dime. Call your parents and tell them they are wasting their money.",
    "When mining for silver, don't throw away the gold nuggets.",
    "You have to beat tradition at its own game.",
    "If you can't be the artist you want to be, pretend.",
    "Go find your girlfriend, and tell her you don't know the first thing about passion.",
    "Be more judicious, and less judgmental.",
    "It just feels a little stingy.",
    "It's like a Christmas ornament that's been left up too long.",
    "[Total silence – but he's smiling.]",
    "Just because a thing can be done, doesn't mean it should be done.",
    "I'd call that, Airport-Baroque style.",
    "You designed a common object that as if martians had landed and had never seen one before.",
    "It's crap, and you know it.",
    "Science and engineering make life possible. Art makes it worth it.",
    "Design is the art form that is incomplete until it is engaged.",
    "Noise is sound that interferes with message.",
    "You might think if you don't work, but you'll certainly think if you due,work.",
    "Design is the act of bringing the mind, heart, and hands closer together.",
    "Never be satisfied, always be content.",
    "Style don't care who wears it.",
    "Styling is a virus.",
    "A rock can be the most comfortable chair in the world, when you're in love.",
    "Instead of shop problems, we have problems that need shop attention.",
    "Nature can reach out to you in very interesting ways. Don't build walls.",
    "Treatment is content, in all that we do.",
    "You can use design to speak, or we can sing.",
    "Service is the birthplace of wonderful form.",
    "Italians have a way of not taking seriousness seriously.",
    "To protect is to promote.",
    "Don't think of it as grading. Think of it as degrading.",
    "You have to feed forward, if you want feed back.",
    "Don't stay out of trouble.",
    "Never show a fool unfinished work.",
    "Design is like making love in a hammock, standing up.",
    "If you find a dry spot, spit in it.",
    "Style happens when thinking stops."

  ];

  const [quotes, setQuotes] = useState(defaultQuotes);
  const [currentQuote, setCurrentQuote] = useState('');
  const [bulkQuotes, setBulkQuotes] = useState('');
  const [showBulkInput, setShowBulkInput] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState('');
  const [randomQuote, setRandomQuote] = useState('');
  const [showQuotesList, setShowQuotesList] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState([]);

  const cleanQuote = (quote) => {
    // Remove any type of quotes from the beginning and end
    let cleaned = quote.replace(/^["""]|["""]$/g, '').trim();
    
    // Remove trailing comma if present
    cleaned = cleaned.replace(/,\s*$/, '');
    
    // Add period if needed (but not if ending in ellipsis or other punctuation)
    if (!cleaned.endsWith('...') && !cleaned.match(/[.!?]$/)) {
      cleaned += '.';
    }
    
    return cleaned;
  };

  const displayWithQuotes = (quote) => `"${quote}"`;

  const addQuote = () => {
    if (currentQuote.trim()) {
      const newQuote = cleanQuote(currentQuote);
      setQuotes(prev => [...prev, newQuote]);
      setCurrentQuote('');
    }
  };

  const addBulkQuotes = () => {
    if (bulkQuotes.trim()) {
      const newQuotes = bulkQuotes
        .split('\n')
        .filter(line => line.trim().length > 0)
        .map(cleanQuote);
      
      setQuotes(prev => [...prev, ...newQuotes]);
      setBulkQuotes('');
      setShowBulkInput(false);
    }
  };

  const removeQuote = (index) => {
    setQuotes(quotes.filter((_, i) => i !== index));
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditValue(quotes[index]);
  };

  const saveEdit = () => {
    if (editValue.trim()) {
      const newQuotes = [...quotes];
      newQuotes[editIndex] = cleanQuote(editValue);
      setQuotes(newQuotes);
      setEditIndex(-1);
      setEditValue('');
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const generateRandomQuote = async () => {
    if (quotes.length > 0 && selectedImage && !isProcessing) {
      setIsProcessing(true);
      const delay = Math.floor(Math.random() * 4000) + 1000;
      
      try {
        await new Promise(resolve => setTimeout(resolve, delay));
        const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setRandomQuote(newQuote);
        
        setHistory(prev => [{
          image: imagePreview,
          quote: newQuote,
          timestamp: new Date().toISOString()
        }, ...prev]);
      } finally {
        setIsProcessing(false);
        setSelectedImage(null);
        setImagePreview('');
      }
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Design feedback from Matt</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload and Generate Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-full max-w-md aspect-video bg-slate-100 rounded-lg flex flex-col items-center justify-center relative">
            {imagePreview ? (
              <img 
                src={imagePreview} 
                alt="Uploaded design"
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <div className="text-center p-4">
                <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                <p className="text-sm text-slate-500">Upload your design</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isProcessing}
            />
          </div>
          <Button 
            onClick={generateRandomQuote} 
            className="bg-blue-600 hover:bg-blue-700"
            disabled={!selectedImage || isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Getting feedback...
              </>
            ) : (
              'Ask Matt'
            )}
          </Button>
        </div>

        {/* Random Quote Display */}
        <div className="bg-slate-50 p-6 rounded-lg text-center min-h-24 flex flex-col items-center justify-center">
          {randomQuote && <p className="text-lg">{displayWithQuotes(randomQuote)}</p>}
        </div>

        {/* History Section */}
        {history.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Previous Feedback</h3>
            <div className="space-y-4">
              {history.map((item, index) => (
                <div key={index} className="flex gap-4 bg-slate-50 p-4 rounded-lg">
                  <div className="w-48 h-32 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={`Design ${index + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-grow flex items-center">
                    <p className="text-lg">{displayWithQuotes(item.quote)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quote Management Section */}
        <div className="space-y-2">
          <Button
            onClick={() => setShowQuotesList(!showQuotesList)}
            variant="link"
            className="text-blue-600 hover:text-blue-800 p-0 h-auto font-semibold flex items-center gap-2"
          >
            {showQuotesList ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            Manage Quotes ({quotes.length})
          </Button>
          
          {showQuotesList && (
            <div className="space-y-4 mt-2">
              {/* Add Quote Input */}
              <div className="flex items-center gap-2">
                <div className="flex-grow flex gap-2">
                  <Input
                    value={currentQuote}
                    onChange={(e) => setCurrentQuote(e.target.value)}
                    placeholder="Add a new quote"
                    onKeyPress={(e) => e.key === 'Enter' && addQuote()}
                  />
                  <Button onClick={addQuote} variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  onClick={() => setShowBulkInput(!showBulkInput)}
                  variant="link"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Add multiple quotes
                </Button>
              </div>

              {/* Bulk Add Section */}
              {showBulkInput && (
                <div className="space-y-2">
                  <Textarea
                    value={bulkQuotes}
                    onChange={(e) => setBulkQuotes(e.target.value)}
                    placeholder="Enter multiple quotes (one per line)"
                    rows={4}
                  />
                  <Button onClick={addBulkQuotes} className="w-full">
                    Add All Quotes
                  </Button>
                </div>
              )}

              {/* Quotes List */}
              <div className="space-y-2">
                {quotes.map((quote, index) => (
                  <div key={index} className="flex items-center gap-2 bg-slate-50 p-2 rounded">
                    {editIndex === index ? (
                      <>
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="flex-grow"
                          onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                        />
                        <Button onClick={saveEdit} variant="ghost" size="icon">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button 
                          onClick={() => setEditIndex(-1)} 
                          variant="ghost" 
                          size="icon"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <span className="flex-grow">{quote}</span>
                        <Button
                          onClick={() => startEdit(index)}
                          variant="ghost"
                          size="icon"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => removeQuote(index)}
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
