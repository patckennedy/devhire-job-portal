import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
    Briefcase,
    Building,
    MapPin,
    DollarSign,
    AlignLeft,
    ClipboardList,
    Globe,
    UploadCloud,
} from 'lucide-react';

const PostJobs = () => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        jobType: '',
        salary: '',
        description: '',
        requirements: '',
        applyLink: '',
        logo: null,
    });


    const [states, setStates] = useState([]);
 const [message, setMessage] = useState('');



    return (
        <div>
            <div>PostJobs</div>
            <h1>Testing the Props</h1>
        </div>
    );
};










export default PostJobs;
