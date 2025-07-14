from fastapi import FastAPI, APIRouter, HTTPException, Form, File, UploadFile, BackgroundTasks
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import json
import tempfile
import asyncio


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Solar System Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ===============================
# DATA MODELS
# ===============================

class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactForm(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ContactFormCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class BlogPost(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    content: str
    excerpt: str
    author: str = "Alex Cosmos"
    category: str
    tags: List[str] = []
    featured_image: Optional[str] = None
    published: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class BlogPostCreate(BaseModel):
    title: str
    content: str
    excerpt: str
    category: str
    tags: List[str] = []
    featured_image: Optional[str] = None
    published: bool = True

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    featured_image: Optional[str] = None
    published: Optional[bool] = None

class AnalyticsEvent(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    event_type: str  # 'page_view', 'planet_click', 'project_view', 'resume_download', etc.
    page: Optional[str] = None
    planet: Optional[str] = None
    project_id: Optional[str] = None
    user_agent: Optional[str] = None
    ip_address: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class AnalyticsEventCreate(BaseModel):
    event_type: str
    page: Optional[str] = None
    planet: Optional[str] = None
    project_id: Optional[str] = None
    user_agent: Optional[str] = None
    ip_address: Optional[str] = None

class ProjectFilter(BaseModel):
    categories: Optional[List[str]] = None
    technologies: Optional[List[str]] = None
    featured_only: Optional[bool] = None
    search_query: Optional[str] = None

# ===============================
# HELPER FUNCTIONS
# ===============================

async def send_email(to_email: str, subject: str, body: str):
    """Send email using SMTP (placeholder - configure with real SMTP settings)"""
    try:
        # This is a placeholder implementation
        # In production, you would configure real SMTP settings
        logger.info(f"Email would be sent to: {to_email}")
        logger.info(f"Subject: {subject}")
        logger.info(f"Body: {body}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return False

def generate_resume_pdf(portfolio_data: dict) -> str:
    """Generate a professional resume PDF and return the file path"""
    temp_dir = tempfile.mkdtemp()
    pdf_path = os.path.join(temp_dir, "resume.pdf")
    
    doc = SimpleDocTemplate(pdf_path, pagesize=letter)
    styles = getSampleStyleSheet()
    story = []
    
    # Title
    title = Paragraph("Alex Cosmos - Full Stack Developer & 3D Artist", styles['Title'])
    story.append(title)
    story.append(Spacer(1, 12))
    
    # Contact Information
    contact_info = f"""
    Email: alex.cosmos@example.com | Phone: +1 (555) 123-4567 | Location: San Francisco, CA<br/>
    GitHub: github.com/alexcosmos | LinkedIn: linkedin.com/in/alexcosmos | Portfolio: alexcosmos.dev
    """
    story.append(Paragraph(contact_info, styles['Normal']))
    story.append(Spacer(1, 12))
    
    # Professional Summary
    summary = Paragraph("Professional Summary", styles['Heading1'])
    story.append(summary)
    summary_text = """
    Passionate full-stack developer with expertise in modern web technologies and 3D visualization. 
    Specialized in creating immersive digital experiences using React, Three.js, and WebGL. 
    Proven track record of building award-winning applications that increased user engagement by 300%.
    """
    story.append(Paragraph(summary_text, styles['Normal']))
    story.append(Spacer(1, 12))
    
    # Experience
    exp_title = Paragraph("Professional Experience", styles['Heading1'])
    story.append(exp_title)
    
    experiences = [
        {
            "company": "Stellar Dynamics",
            "position": "Senior Full Stack Developer",
            "duration": "2022 - Present",
            "achievements": [
                "Led development of 3D product visualization platform serving 1M+ users",
                "Led team of 5 developers in agile environment",
                "Reduced page load times by 40% through optimization",
                "Implemented real-time collaboration features"
            ]
        },
        {
            "company": "Cosmic Labs",
            "position": "Frontend Developer",
            "duration": "2020 - 2022",
            "achievements": [
                "Built interactive galaxy simulation for NASA research",
                "Created data visualization tools for astronomical data",
                "Contributed to open-source Three.js ecosystem",
                "Mentored junior developers"
            ]
        }
    ]
    
    for exp in experiences:
        exp_header = f"<b>{exp['position']}</b> - {exp['company']} ({exp['duration']})"
        story.append(Paragraph(exp_header, styles['Normal']))
        for achievement in exp['achievements']:
            story.append(Paragraph(f"• {achievement}", styles['Normal']))
        story.append(Spacer(1, 6))
    
    # Skills
    skills_title = Paragraph("Technical Skills", styles['Heading1'])
    story.append(skills_title)
    
    skills_text = """
    <b>Frontend:</b> JavaScript, React, Three.js, WebGL, HTML5, CSS3<br/>
    <b>Backend:</b> Node.js, Python, FastAPI, MongoDB, PostgreSQL<br/>
    <b>3D Graphics:</b> Three.js, WebGL, Blender, Unity<br/>
    <b>Cloud & DevOps:</b> AWS, Docker, CI/CD
    """
    story.append(Paragraph(skills_text, styles['Normal']))
    story.append(Spacer(1, 12))
    
    # Education
    edu_title = Paragraph("Education", styles['Heading1'])
    story.append(edu_title)
    
    education_text = """
    <b>Master of Science in Computer Science</b> - Stanford University (2016-2018)<br/>
    Specialization: Computer Graphics & HCI | GPA: 3.9/4.0<br/>
    <b>Bachelor of Science in Computer Science</b> - UC Berkeley (2012-2016)<br/>
    Specialization: Software Engineering | GPA: 3.8/4.0 | Summa Cum Laude
    """
    story.append(Paragraph(education_text, styles['Normal']))
    
    doc.build(story)
    return pdf_path

# ===============================
# API ENDPOINTS
# ===============================

@api_router.get("/")
async def root():
    return {"message": "Hello World"}

# Original Status Check Endpoints
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Resume Download Endpoint
@api_router.get("/resume/download")
async def download_resume():
    """Generate and download a professional resume PDF"""
    try:
        # Placeholder portfolio data - in production, this would come from database
        portfolio_data = {}
        pdf_path = generate_resume_pdf(portfolio_data)
        
        # Track analytics
        analytics_event = AnalyticsEvent(
            event_type="resume_download",
            page="resume"
        )
        await db.analytics.insert_one(analytics_event.dict())
        
        return FileResponse(
            pdf_path,
            media_type="application/pdf",
            filename="Alex_Cosmos_Resume.pdf"
        )
    except Exception as e:
        logger.error(f"Resume download failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to generate resume")

# Contact Form Endpoints
@api_router.post("/contact", response_model=ContactForm)
async def submit_contact_form(form_data: ContactFormCreate, background_tasks: BackgroundTasks):
    """Submit contact form and send email notification"""
    try:
        contact_dict = form_data.dict()
        contact_obj = ContactForm(**contact_dict)
        
        # Save to database
        await db.contact_forms.insert_one(contact_obj.dict())
        
        # Send email notification (background task)
        background_tasks.add_task(
            send_email,
            "alex.cosmos@example.com",
            f"New Contact Form: {contact_obj.subject}",
            f"From: {contact_obj.name} ({contact_obj.email})\n\nMessage:\n{contact_obj.message}"
        )
        
        # Track analytics
        analytics_event = AnalyticsEvent(
            event_type="contact_form_submit",
            page="contact"
        )
        await db.analytics.insert_one(analytics_event.dict())
        
        return contact_obj
    except Exception as e:
        logger.error(f"Contact form submission failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

@api_router.get("/contact", response_model=List[ContactForm])
async def get_contact_forms():
    """Get all contact form submissions (admin only)"""
    contact_forms = await db.contact_forms.find().sort("timestamp", -1).to_list(1000)
    return [ContactForm(**form) for form in contact_forms]

# Blog Endpoints
@api_router.post("/blog", response_model=BlogPost)
async def create_blog_post(post_data: BlogPostCreate):
    """Create a new blog post"""
    try:
        post_dict = post_data.dict()
        post_obj = BlogPost(**post_dict)
        
        await db.blog_posts.insert_one(post_obj.dict())
        
        # Track analytics
        analytics_event = AnalyticsEvent(
            event_type="blog_post_created",
            page="blog"
        )
        await db.analytics.insert_one(analytics_event.dict())
        
        return post_obj
    except Exception as e:
        logger.error(f"Blog post creation failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create blog post")

@api_router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts(
    category: Optional[str] = None,
    published: Optional[bool] = True,
    limit: int = 20
):
    """Get blog posts with optional filtering"""
    query = {}
    if category:
        query["category"] = category
    if published is not None:
        query["published"] = published
    
    posts = await db.blog_posts.find(query).sort("created_at", -1).limit(limit).to_list(limit)
    return [BlogPost(**post) for post in posts]

@api_router.get("/blog/{post_id}", response_model=BlogPost)
async def get_blog_post(post_id: str):
    """Get a specific blog post by ID"""
    post = await db.blog_posts.find_one({"id": post_id})
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    # Track analytics
    analytics_event = AnalyticsEvent(
        event_type="blog_post_view",
        page="blog",
        project_id=post_id
    )
    await db.analytics.insert_one(analytics_event.dict())
    
    return BlogPost(**post)

@api_router.put("/blog/{post_id}", response_model=BlogPost)
async def update_blog_post(post_id: str, post_data: BlogPostUpdate):
    """Update a blog post"""
    post = await db.blog_posts.find_one({"id": post_id})
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    update_data = {k: v for k, v in post_data.dict().items() if v is not None}
    update_data["updated_at"] = datetime.utcnow()
    
    await db.blog_posts.update_one({"id": post_id}, {"$set": update_data})
    
    updated_post = await db.blog_posts.find_one({"id": post_id})
    return BlogPost(**updated_post)

@api_router.delete("/blog/{post_id}")
async def delete_blog_post(post_id: str):
    """Delete a blog post"""
    result = await db.blog_posts.delete_one({"id": post_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return {"message": "Blog post deleted successfully"}

# Analytics Endpoints
@api_router.post("/analytics/event", response_model=AnalyticsEvent)
async def track_analytics_event(event_data: AnalyticsEventCreate):
    """Track an analytics event"""
    try:
        event_dict = event_data.dict()
        event_obj = AnalyticsEvent(**event_dict)
        
        await db.analytics.insert_one(event_obj.dict())
        return event_obj
    except Exception as e:
        logger.error(f"Analytics tracking failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to track event")

@api_router.get("/analytics/stats")
async def get_analytics_stats():
    """Get analytics statistics"""
    try:
        # Total page views
        total_views = await db.analytics.count_documents({"event_type": "page_view"})
        
        # Planet clicks
        planet_clicks = await db.analytics.count_documents({"event_type": "planet_click"})
        
        # Resume downloads
        resume_downloads = await db.analytics.count_documents({"event_type": "resume_download"})
        
        # Project views
        project_views = await db.analytics.count_documents({"event_type": "project_view"})
        
        # Most popular planets
        planet_pipeline = [
            {"$match": {"event_type": "planet_click"}},
            {"$group": {"_id": "$planet", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
            {"$limit": 10}
        ]
        popular_planets = await db.analytics.aggregate(planet_pipeline).to_list(10)
        
        # Daily page views (last 30 days)
        daily_pipeline = [
            {"$match": {"event_type": "page_view"}},
            {"$group": {
                "_id": {"$dateToString": {"format": "%Y-%m-%d", "date": "$timestamp"}},
                "count": {"$sum": 1}
            }},
            {"$sort": {"_id": -1}},
            {"$limit": 30}
        ]
        daily_views = await db.analytics.aggregate(daily_pipeline).to_list(30)
        
        return {
            "total_views": total_views,
            "planet_clicks": planet_clicks,
            "resume_downloads": resume_downloads,
            "project_views": project_views,
            "popular_planets": popular_planets,
            "daily_views": daily_views
        }
    except Exception as e:
        logger.error(f"Analytics stats failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get analytics stats")

# Project Filtering Endpoint
@api_router.post("/projects/filter")
async def filter_projects(filter_data: ProjectFilter):
    """Filter projects based on criteria"""
    try:
        # This would typically query a projects collection
        # For now, returning mock data that would be filtered
        
        # Track analytics
        analytics_event = AnalyticsEvent(
            event_type="project_filter",
            page="projects"
        )
        await db.analytics.insert_one(analytics_event.dict())
        
        return {
            "message": "Project filtering endpoint ready",
            "filters_applied": filter_data.dict()
        }
    except Exception as e:
        logger.error(f"Project filtering failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to filter projects")

# Blog Categories Endpoint
@api_router.get("/blog/categories")
async def get_blog_categories():
    """Get all blog categories"""
    categories = await db.blog_posts.distinct("category")
    return {"categories": categories}

# Blog Tags Endpoint
@api_router.get("/blog/tags")
async def get_blog_tags():
    """Get all blog tags"""
    pipeline = [
        {"$unwind": "$tags"},
        {"$group": {"_id": "$tags", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    tags = await db.blog_posts.aggregate(pipeline).to_list(100)
    return {"tags": [{"tag": tag["_id"], "count": tag["count"]} for tag in tags]}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()