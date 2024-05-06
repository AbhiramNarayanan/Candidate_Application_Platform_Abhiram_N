import React, { useState, useEffect } from "react";

const JobFilters = ({ jobs, setFilteredJobs }) => {
  // Define state for filters
  const [selectedRole, setSelectedRole] = useState("");
  const [search, setSearch] = useState("");
  
  // Fetch unique values for roles
  const roles = Array.from(new Set(jobs.map(job => job.jobRole))).sort();

  useEffect(() => {
    filterJobs();
  }, [selectedRole, search]);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  // Filtering function
  const filterJobs = () => {
    const filteredJobs = jobs.filter(job => {
      return (
        (selectedRole === "" || job.jobRole === selectedRole) &&
        Object.keys(job).some((key) =>
          job[key]
            .toString()
            .toLowerCase()
            .includes(search.toString().toLowerCase())
        )
      );
    });
    setFilteredJobs(filteredJobs);
  };

  return (
    <div>
      {/* Roles dropdown */}
      <select
        id="roles"
        value={selectedRole}
        onChange={(e) => handleRoleSelect(e.target.value)}
      >
        <option value="">All Roles</option>
        {roles.map((role) => (
          <option key={role} value={role}>{role}</option>
        ))}
      </select>

      <input
        className="company-input"
        placeholder="Search Company Name"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
    </div>
  );
};

export default JobFilters;
