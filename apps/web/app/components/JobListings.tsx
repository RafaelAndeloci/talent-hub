"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import jobsData from "../data/jobs.json";

export default function JobListings() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = jobsData.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <section id="opportunities" className="bg-background py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Oportunidades em destaque
        </h2>
        <div className="mx-auto mb-8 max-w-xl">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Pesquise estágios e empregos de nível de entrada..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="grow"
            />
            <Button>
              <Search className="mr-2 h-4 w-4" />
              Pesquisar
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <div key={job.id} className="rounded-lg bg-card p-6 shadow-md">
              <h3 className="mb-2 text-xl font-semibold">{job.title}</h3>
              <p className="mb-2 text-muted-foreground">{job.company}</p>
              <p className="mb-2 text-muted-foreground">{job.location}</p>
              <p className="mb-2 text-muted-foreground">{job.type}</p>
              <p className="font-medium text-card-foreground">{job.salary}</p>
              <Button variant="default" className="mt-4">
                Inscreva-se
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
