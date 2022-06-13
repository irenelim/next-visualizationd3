export const initialData = {
  name: "organization",
  children: [
    {
      name: "Art Web",
      children: [
        { name: "Community Vision" },
        { name: "Silicon Valley Creates" },
      ],
    },
    {
      name: "Social Impact Commons",
      children: [
        { name: "Theatre Bay Area" },
        { name: "EastSide Arts Alliance" },
        { name: "Local Color" },
      ],
    },
    {
      name: "Community Arts Stabilization Trust",
      children: [
        { name: "CounterPulse" },
        { name: "Luggage Store Gallery" },
        { name: "Performing Arts Workshop" },
        { name: "447 Minna St." },
        { name: "Keeping Space Oakland" },
      ],
    },
    {
      name: "AmbitioUS",
      children: [
        { name: "EBPREC" },
        { name: "SELC" },
        { name: "The Runway Project" },
        { name: "Common Future" },
        { name: "Freelancers Union" },
        { name: "US Federation of Worker Cooperatives" },
      ],
    },
  ],
};

export const data = {
  nodes: [
    { id: "Microsoft", radiusSize: 40, fillColor: '#E6A6B0' },
    { id: "Amazon", radiusSize: 15, fillColor: '#A6D096' },
    { id: "HTC", radiusSize: 15, fillColor: '#A6D096' },
    { id: "Samsung", radiusSize: 15, fillColor: '#A6D096' },
    { id: "Apple", radiusSize: 40, fillColor: '#E6A6B0' },
    { id: "Motorola", radiusSize: 15, fillColor: '#A6D096' },
    { id: "Nokia", radiusSize: 15, fillColor: '#A6D096' },
    { id: "Kodak", radiusSize: 40, fillColor: '#E6A6B0' },
    { id: "Barnes & Noble", radiusSize: 15, fillColor: '#A6D096' },
    { id: "Foxconn", radiusSize: 15, fillColor: '#A6D096' },
    { id: "Oracle", radiusSize: 15, fillColor: '#A6D096' },
    { id: "Google", radiusSize: 15, fillColor: '#A6D096' },
    { id: "Inventec", radiusSize: 15, fillColor: '#A6D096' },
    { id: "LG", radiusSize: 15, fillColor: '#A6D096' },
    { id: "RIM", radiusSize: 15, fillColor: '#A6D096' },
    { id: "Sony", radiusSize: 15, fillColor: '#A6D096' },
    { id: "Qualcomm", radiusSize: 15, fillColor: '#A6D096' },
    { id: "Huawei", radiusSize: 15, fillColor: '#A6D096' },
    { id: "ZTE", radiusSize: 40, fillColor: '#E6A6B0' },
    { id: "Ericsson", radiusSize: 15, fillColor: '#A6D096' },
  ],
  links: [
    { source: "Microsoft", target: "Amazon", type: "licensing" },
    { source: "Microsoft", target: "HTC", type: "licensing" },
    { source: "Samsung", target: "Apple", type: "suit" },
    { source: "Motorola", target: "Apple", type: "suit" },
    { source: "Nokia", target: "Apple", type: "resolved" },
    { source: "HTC", target: "Apple", type: "suit" },
    { source: "Kodak", target: "Apple", type: "suit" },
    { source: "Microsoft", target: "Barnes & Noble", type: "suit" },
    { source: "Microsoft", target: "Foxconn", type: "suit" },
    { source: "Oracle", target: "Google", type: "suit" },
    { source: "Apple", target: "HTC", type: "suit" },
    { source: "Microsoft", target: "Inventec", type: "suit" },
    { source: "Samsung", target: "Kodak", type: "resolved" },
    { source: "LG", target: "Kodak", type: "resolved" },
    { source: "RIM", target: "Kodak", type: "suit" },
    { source: "Sony", target: "LG", type: "suit" },
    { source: "Kodak", target: "LG", type: "resolved" },
    { source: "Apple", target: "Nokia", type: "resolved" },
    { source: "Qualcomm", target: "Nokia", type: "resolved" },
    { source: "Apple", target: "Motorola", type: "suit" },
    { source: "Microsoft", target: "Motorola", type: "suit" },
    { source: "Motorola", target: "Microsoft", type: "suit" },
    { source: "Huawei", target: "ZTE", type: "suit" },
    { source: "Ericsson", target: "ZTE", type: "suit" },
    { source: "Kodak", target: "Samsung", type: "resolved" },
    { source: "Apple", target: "Samsung", type: "suit" },
    { source: "Kodak", target: "RIM", type: "suit" },
    { source: "Nokia", target: "Qualcomm", type: "suit" },
  ],
};

export namespace Types {
    export type Node = {
      // id: string
      name: string;
    //   group: number
      radiusSize?: number;
      fillColor?: string;
      depth?: number;
      index?: number;
      parent?: any;
      data?: any;

    }
    export type Link = {
      source: any
      target: any
      type?: string
    }
    export type DataObject = {
      nodes: Node[]
      links: Link[]
    }
    export type point = {
      x: number
      y: number
    }
    export type datum = {
      x: number
      y: number
      fx: number | null
      fy: number | null
    }
  }
